from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import models
from apscheduler.schedulers.background import BackgroundScheduler
import schemas
from database import get_db, SessionLocal
from hashing import hash_password, verify_password
from security import create_access_token, get_current_user, SECRET_KEY, ALGORITHM
from email_utils import send_verification_email
from datetime import datetime, timedelta
from jose import jwt, JWTError

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@router.post("/signup", status_code=201, response_model=schemas.UserResponse)
def user_signup(user_data: schemas.UserSignUp, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):

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



    # Check if the username is exist
    existing_user = db.query(models.User).filter(
        (models.User.email == user_data.email) | (models.User.username == user_data.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already registered")


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

    verification_token = create_access_token(data={"sub": new_user.email, "purpose": "email_verification"})
    background_tasks.add_task(send_verification_email, new_user.email, verification_token)

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

    elif not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")

    elif not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your email address first")


    # Access token function from the security.py file
    access_token = create_access_token(data={"sub": str(user.id), "name": user.name, "role": "Normal_user"})

    return {
        "message": "Login Successful",
        "name": user.name,
        "username": user.username,
        "access_token": access_token,
        "token_type": "bearer"
    }

# Resending verification
@router.post("/resend-verification")
async def resend_verification(
        email: str,
        background_tasks: BackgroundTasks,
        db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

        # إذا كان الحساب مؤكداً بالفعل، لا داعي لإرسال الإيميل
    if user.is_verified:
        raise HTTPException(status_code=400, detail="Email is already verified, you can login directly.")

    new_token = create_access_token(data={"sub": user.email, "purpose": "email_verification"})

    # إرسال الرابط الجديد في الخلفية
    background_tasks.add_task(send_verification_email, user.email, new_token)

    return {"message": "A new verification email has been sent successfully"}



# Clean up the verification link ==================================
def claen_verification_dayly():

    db = SessionLocal()
    try:

        threshold_date = datetime.utcnow() - timedelta(days=2)

        unverified_users = db.query(models.User).filter(
            models.User.is_verified == False,
            models.User.created_at < threshold_date
        ).all()

        for user in unverified_users:
            db.delete(user)

        db.commit()

    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(claen_verification_dayly, 'interval', minutes=1)

@router.on_event("startup")
def start_scheduler_cleanup_unverified():
    if not scheduler.running:
        scheduler.start()

@router.on_event("shutdown")
def stop_scheduler_cleanup_unverified():
    if scheduler.running:
        scheduler.shutdown()

# Get Verfify email
@router.get("/verify-email")
async def verify_email(token: str, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=404,
        detail="Invalid or expired verification token",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        purpose: str = payload.get("purpose")

        if email is None or purpose != "email_verification":
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.is_verified:
        return {"message": "Email is already verified. You can login now."}

    user.is_verified = True
    db.commit()

    return {
        "message": "Email verified successfully! You can now login to your account."
    }