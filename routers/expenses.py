from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import models
import schemas
from database import get_db

router = APIRouter(prefix="/expenses", tags=["expenses"])

@router.post("/users/{user_id}/expense")
def create_expense(user_id: str, expense_data: schemas.ExpenseCreate, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist")

    new_expense = models.Expense(
        amount = expense_data.amount,
        category = expense_data.category,
        user_id = user_id,
        details = expense_data.details
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

# get Expenses =============================
@router.get("/expenses/{user_id}")
async def get_expenses_byUserId(user_id: str, category: Optional[str] = "all", limit: Optional[int] = 10,db: Session = Depends(get_db)):


    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="The User is not exist")


    query = db.query(models.Expense).filter(models.Expense.user_id == user_id)

    if category != "all":
        query = query.filter(models.Expense.category == category)

    expenses = query.limit(limit).all()

    return expenses

    # allExpenses = []
    # i = 0
    # if category == "all":
    #     for e in db.query(models.Expense).filter(models.Expense.user_id == user_id):
    #         allExpenses.append(e)
    #         i += 1
    #         if i >= limit:
    #             break
    # else:
    #     for e in db.query(models.Expense).filter(models.Expense.user_id == user_id , models.Expense.category == category):
    #         allExpenses.append(e)
    #         i += 1
    #         if i >= limit:
    #             break
    #
    # return allExpenses