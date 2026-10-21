import os
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError # استدعاء معالج أخطاء التوكن
from sqlalchemy.orm import Session # استدعاء نوع جلسة قاعدة البيانات
from database import get_db # استدعاء دالة الاتصال بقاعدة البيانات
import models # استدعاء الجداول

load_dotenv()

SECRET_KEY= os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(hours=72)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

# في ملف security.py
from fastapi import HTTPException, status, Depends


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # 1. التفتيش في القائمة السوداء أولاً
    is_blacklisted = db.query(models.BlacklistedToken).filter(models.BlacklistedToken.token == token).first()

    if is_blacklisted:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="تم تسجيل الخروج مسبقاً، هذا التوكن لم يعد صالحاً"
        )

    # 2. إذا لم يكن في القائمة السوداء، نكمل عملية فك التشفير العادية
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # إكمال استخراج المستخدم...

    except JWTError:
        raise HTTPException(status_code=401, detail="توكن غير صالح")


def create_verification_token(email: str):
    expire = datetime.utcnow() + timedelta(hours=24) # صالح لمدة يوم واحد
    to_encode = {"sub": email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt