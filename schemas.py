from pydantic import BaseModel
from datetime import datetime

# ========= User Schemas =========
class UserSignUp(BaseModel):
    name: str
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    identifier: str
    password: str


class UserResponse(BaseModel):
    name: str
    username: str
    email: str

    # هذا السطر السحري يخبر Pydantic أن يقرأ من قاعدة البيانات مباشرة
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    message: str = "Login Successful"
    name: str
    username: str
    access_token: str
    token_type: str



# ========= Expense Schemas =========
class ExpenseCreate(BaseModel):
    amount: float
    category: str
    details: str


class ExpenseUpdate(BaseModel):
    amount: float
    category: str
    details: str

# ========= Recurring Expense Schemas =========
class RecurringExpenseCreate(BaseModel):
    amount: float
    category: str
    details: str
    day_of_month: int
    remaining_months: int

class RecurringExpenseUpdate(BaseModel):
    amount: float
    category: str
    details: str
    day_of_month: int
    remaining_months: int

