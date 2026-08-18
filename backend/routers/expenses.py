from datetime import datetime
from sqlalchemy import func, desc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from apscheduler.schedulers.background import BackgroundScheduler
import models
import schemas
from database import get_db, SessionLocal
from security import get_current_user

router = APIRouter(prefix="/expenses", tags=["expenses"])

# Create an Expense =============================
@router.post("/")
def create_expense(expense_data: schemas.ExpenseCreate, db: Session = Depends(get_db), current_userId: str = Depends(get_current_user)):

    user = db.query(models.User).filter(models.User.id == current_userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist")

    new_expense = models.Expense(
        amount = expense_data.amount,
        category = expense_data.category,
        user_id = current_userId,
        details = expense_data.details,
        expense_date = datetime.now()
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

# get Expenses =============================
@router.get("/")
async def get_expenses_byUserId(
        current_userId: str = Depends(get_current_user),
        search_details: Optional[str] = None,
        exact_amount: Optional[float] = None,
        category: Optional[str] = "all",
        limit: Optional[int] = 10,
        db: Session = Depends(get_db)):


    user = db.query(models.User).filter(models.User.id == current_userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist")


    query = db.query(models.Expense).filter(models.Expense.user_id == current_userId)

    if category != "all":
        query = query.filter(models.Expense.category == category)

    if search_details:
        query = query.filter(models.Expense.details.ilike(f"%{search_details}%"))

    if exact_amount is not None:
        query = query.filter(models.Expense.amount == exact_amount)

    query = query.order_by(desc(models.Expense.expense_date))
    if limit == -1:

        return query.all()


    expenses = query.limit(limit).all()



    return expenses

# total expenses =============================
@router.get("/summary")
async def get_total_expenses(
        current_userId: str = Depends(get_current_user),
        db: Session = Depends(get_db),
        category: Optional[str] = "all"
):

    user = db.query(models.User).filter(models.User.id == current_userId)
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist")

    query = db.query(func.sum(models.Expense.amount)).filter(models.Expense.user_id == current_userId)

    if category != "all":
        query = query.filter(models.Expense.category == category)


    totalAmount = query.scalar() or 0.0

    return {
        "category": category,
        "total_amount": totalAmount,

    }



# Update an Expense =============================
@router.put("/{expense_id}")
async def update_expense(
        new_expense: schemas.ExpenseUpdate,
        expense_id: int,
        current_userId: str = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id, models.Expense.user_id == current_userId).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or you don't have permission")

    expense.amount = new_expense.amount
    expense.category = new_expense.category
    expense.details = new_expense.details

    db.commit()
    db.refresh(expense)

    return expense

# Delete an Expense =============================
@router.delete("/{expense_id}")
async def delete_expense(
        expense_id: int,
        db: Session = Depends(get_db),
        current_user_id: str = Depends(get_current_user)
):
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id, models.Expense.user_id == current_user_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or you don't have permission")

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }

# Recurring Expenses =============================
def add_recurring_expenses_daily():

    db = SessionLocal()
    try:
        today = datetime.utcnow()
        current_day = today.day

        recurring_tasks = db.query(models.RecurringExpense).filter(
            models.RecurringExpense.day_of_month == current_day,
            models.RecurringExpense.remaining_months > 0
        ).all()

        for task in recurring_tasks:
            new_expense = models.Expense(
                amount = task.amount,
                category = task.category,
                details=task.details,
                user_id=task.user_id,
                date=today
            )
            db.add(new_expense)
            task.remaining_months -= 1

        db.commit()

    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(add_recurring_expenses_daily, 'interval', minutes=1)

@router.on_event("startup")
def start_scheduler():
    if not scheduler.running:
        scheduler.start()

@router.on_event("shutdown")
def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()

@router.post("/recurring")
def create_recurring_expense(expense_data: schemas.RecurringExpenseCreate, db: Session = Depends(get_db), current_userId: str = Depends(get_current_user)):
    user = db.query(models.User).filter(models.User.id == current_userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist!")

    if expense_data.day_of_month <= 0 or expense_data.day_of_month >= 29:
        raise HTTPException(status_code=403, detail="The day of month must be between 1 and 28!!")

    if expense_data.remaining_months < 0:
        raise HTTPException(status_code=403, detail="The remaining months must be positive!!")
    new_expense = models.RecurringExpense(
        amount=expense_data.amount,
        category=expense_data.category,
        user_id=current_userId,
        details=expense_data.details,
        day_of_month=expense_data.day_of_month,
        remaining_months=expense_data.remaining_months,
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

# get Recurring Expenses =============================
@router.get("/recurring")
def get_recurring_expenses(db: Session = Depends(get_db), current_userId: str = Depends(get_current_user)):

    user = db.query(models.User).filter(models.User.id == current_userId).first()

    if not user:
        raise HTTPException(status_code=404, detail="User is not exist!")

    recurring_expenses = db.query(models.RecurringExpense).filter(
        models.RecurringExpense.user_id == current_userId,
        models.RecurringExpense.remaining_months > 0
    ).all()

    return recurring_expenses

# update Recurring Expenses =============================
@router.put("/recurring/{recurring_expense_id}")
def update_recurring_expense(
        new_recurring_expense: schemas.RecurringExpenseUpdate,
        recurring_expense_id: int,
        current_userId: str = Depends(get_current_user),
        db: Session = Depends(get_db)
):

    if new_recurring_expense.day_of_month <= 0 or new_recurring_expense.day_of_month >= 29:
        raise HTTPException(status_code=404, detail="day of month must be between 1 and 28")

    if new_recurring_expense.remaining_months < 0:
        raise HTTPException(status_code=403, detail="The remaining months must be positive!")

    user = db.query(models.User).filter(models.User.id == current_userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User is not exist!")

    recurring_expense = db.query(models.RecurringExpense).filter(
        models.RecurringExpense.user_id == current_userId,
        models.RecurringExpense.id == recurring_expense_id
    ).first()

    if not recurring_expense:
        raise HTTPException(status_code=404, detail="Recurring Expense is not found or you are unauthorized")



    recurring_expense.amount = new_recurring_expense.amount
    recurring_expense.category = new_recurring_expense.category
    recurring_expense.details = new_recurring_expense.details
    recurring_expense.day_of_month = new_recurring_expense.day_of_month
    recurring_expense.remaining_months = new_recurring_expense.remaining_months

    db.commit()
    db.refresh(recurring_expense)

    return recurring_expense

# Delete Recurring expense =======================
@router.delete("/recurring/{recurring_expense_id}")
def delete_recurring_expense(
        recurring_expense_id: int,
        db: Session = Depends(get_db),
        current_userId: str = Depends(get_current_user)
):

    user = db.query(models.User).filter(models.User.id == current_userId).first()
    if not user:
        raise HTTPException(status_code=204, detail="User is not exist!")

    recurring_expense = db.query(models.RecurringExpense).filter(
        models.RecurringExpense.user_id == current_userId,
        models.RecurringExpense.id == recurring_expense_id
    ).first()

    if not recurring_expense:
        raise HTTPException(status_code=404, detail="Recurring Expense is not found or you are unauthorized")

    db.delete(recurring_expense)
    db.commit()

    return {
        "message": f"Recurring Expense deleted successfully"
    }
