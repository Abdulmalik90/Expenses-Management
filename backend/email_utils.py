import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from dotenv import load_dotenv

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    MAIL_FROM = os.getenv("MAIL_FROM"),
    MAIL_PORT = 465,
    MAIL_SERVER = os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)


async def send_verification_email(email: EmailStr, token: str):
    # هذا هو الرابط الذي سيضغط عليه المستخدم (سنقوم ببرمجة مسار verify-email لاحقاً)
    verify_url = f"http://localhost:8000/users/verify-email?token={token}"

    # تصميم الإيميل باستخدام HTML
    html_content = f"""
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Welcome to Expense Management App! 🎉</h2>
        <p>Thank you for registering. Please click the button below to verify your email address:</p>
        <a href="{verify_url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Verify My Email</a>
        <br><br>
        <p style="font-size: 12px; color: gray;">If you didn't request this, please ignore this email.</p>
    </div>
    """

    # تجهيز الرسالة
    message = MessageSchema(
        subject="Verify your email address",  # عنوان الإيميل
        recipients=[email],  # قائمة المستقبلين
        body=html_content,
        subtype=MessageType.html
    )

    # أمر الإرسال
    fm = FastMail(conf)
    await fm.send_message(message)
    print("✅ Verification email sent successfully!")