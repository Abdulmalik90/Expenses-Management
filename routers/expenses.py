from datetime import datetime
from sqlalchemy import func, desc
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import models
import schemas
from database import get_db
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

# total expenses
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