from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from hashing import hash_password, verify_password

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@router.post("/signup", status_code=201, response_model=schemas.UserResponse)
def user_signup(user_data: schemas.UserSignUp, db: Session = Depends(get_db)):
    complexSigns = ["!", "@", "#", "$", "%", "^", "&", "*"]
    if len(user_data.password) < 8:
        raise HTTPException(status_code=403, detail="Password must be more than 8 digits")

    validPassword = False
    for s in complexSigns:
        if s in user_data.password:
            validPassword = True
            break
    if not validPassword:
        raise HTTPException(status_code=403, detail="Password must has on of these signs: !, @, #, $, %, ^, &, *")

    hashed_pwd = hash_password(user_data.password)



    new_user = models.User(

        name = user_data.name,
        username = user_data.username,
        email = user_data.email,
        hashed_password = hashed_pwd
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user

@router.post("/login", status_code=200, response_model=schemas.UserResponse)
def user_email_login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):

    if "@" in user_data.identifier:
        user = db.query(models.User).filter(models.User.email == user_data.identifier).first()
    else:
        user = db.query(models.User).filter(models.User.username == user_data.identifier).first()


    if user is None:
        raise HTTPException(status_code=403, detail="User is not found")

    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=403, detail="Invalid Password")

    return {
        "message": "Login Successful",
        "name": user.name,
        "username": user.name
    }

