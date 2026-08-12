from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from hashing import hash_password, verify_password
from security import create_access_token, get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@router.post("/signup", status_code=201, response_model=schemas.UserResponse)
def user_signup(user_data: schemas.UserSignUp, db: Session = Depends(get_db)):

    # Checking if the user make strong password
    complexSigns = ["!", "@", "#", "$", "%", "^", "&", "*"]
    if len(user_data.password) < 8:
        raise HTTPException(status_code=403, detail="Password must be more than 8 digits")

    validPassword = False
    for s in complexSigns:
        if s in user_data.password:
            validPassword = True
            break
    if not validPassword:
        raise HTTPException(status_code=403, detail="Password must has one of these signs: !, @, #, $, %, ^, &, *")


    # Checking if the username have complesSigns
    validUsername = True
    for s in complexSigns:
        if s in user_data.username:
            validUsername = False
            break
    if not validUsername:
        raise HTTPException(status_code=403, detail="Username must not has one of these signs: !, @, #, $, %, ^, &, *")


    # hashing the password to make sure it's secure
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

@router.post("/login", status_code=200, response_model=schemas.TokenResponse)
def user_email_login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    # Check the login method: email or username
    if "@" in form_data.username:
        user = db.query(models.User).filter(models.User.email == form_data.username).first()
    else:
        user = db.query(models.User).filter(models.User.username == form_data.username).first()

    # Checking if the user inputs are valid
    if user is None:
        raise HTTPException(status_code=403, detail="Invalid Credentials")

    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")

    # Access token function from the security.py file
    access_token = create_access_token(data={"sub": str(user.id), "name": user.name, "role": "Normal_user"})

    return {
        "message": "Login Successful",
        "name": user.name,
        "username": user.username,
        "access_token": access_token,
        "token_type": "bearer"
    }


