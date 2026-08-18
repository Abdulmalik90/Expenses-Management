import os
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

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

def get_current_user(token: str = Depends(oauth2_scheme)):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Un Oauthrized to enter this page",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id: str = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="The login session has been expired, please log in again")

    except jwt.PyJWTError:
        raise credentials_exception


def create_verification_token(email: str):
    expire = datetime.utcnow() + timedelta(hours=24) # صالح لمدة يوم واحد
    to_encode = {"sub": email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt