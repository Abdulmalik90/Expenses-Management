from pydantic import BaseModel

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




# ========= Expense Schemas =========
class ExpenseCreate(BaseModel):
    amount: float
    category: str
    details: str