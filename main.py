from fastapi import FastAPI
import models
from database import engine
# استدعاء الراوتر الذي أنشأناه للتو
from routers import users, expenses

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(expenses.router)
