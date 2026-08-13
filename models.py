import uuid
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(50))
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    expenses = relationship("Expense", back_populates="owner")


class Expense(Base):
    __tablename__ = "expense"

    id = Column(Integer, primary_key=True)
    amount = Column(Numeric(10, 2), nullable = False, default=0)
    category = Column(String(70))
    details = Column(String(300))
    expense_date = Column(DateTime, default=datetime.utcnow())

    user_id = Column(String, ForeignKey("users.id"))
    owner = relationship("User", back_populates="expenses")


