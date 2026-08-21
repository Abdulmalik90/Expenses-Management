from fastapi import FastAPI
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware
# استدعاء الراوتر الذي أنشأناه للتو
from routers import users, expenses

app = FastAPI()

# links that api deals with
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:5173",
    "*" # star means all links
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # السماح بجميع العمليات (GET, POST, PUT, DELETE)
    allow_headers=["*"], # السماح بجميع أنواع الترويسات (مثل Authorization للتوكن)
)
@app.get("/")
def root():
    return {"message": "Welcome to the Expense Management API"}

models.Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(expenses.router)
