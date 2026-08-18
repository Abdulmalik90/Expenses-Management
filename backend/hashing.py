import bcrypt


def hash_password(password: str):
    # تحويل كلمة المرور إلى بايتات وقصها لتكون 72 بايت كحد أقصى لتجنب الخطأ
    pwd_bytes = password.encode('utf-8')[:72]

    # توليد "الملح" وتشفير كلمة المرور
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)

    # إرجاع الهاش كنص عادي ليحفظ في قاعدة البيانات
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str):
    # تحويل النصين إلى بايتات للمطابقة
    pwd_bytes = plain_password.encode('utf-8')
    hash_bytes = hashed_password.encode('utf-8')

    # هذه الدالة ترجع True إذا كانت كلمة المرور صحيحة، و False إذا كانت خاطئة
    return bcrypt.checkpw(pwd_bytes, hash_bytes)