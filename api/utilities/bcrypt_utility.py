from passlib.context import CryptContext

password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_hashed_pw(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hash_pass: str) -> str:
    return password_context.verify(password, hash_pass)
