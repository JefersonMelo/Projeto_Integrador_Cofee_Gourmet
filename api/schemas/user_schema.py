from pydantic import BaseModel

from api.schemas.product_schema import Product


class UserBase(BaseModel):
    UserEmail: str


class UserCreate(UserBase):
    UserName: str
    Password: str

    class Config:
        orm_mode = True


class UserLogin(UserBase):
    password: str

    class Config:
        orm_mode = True


class User(UserBase):
    UserID: int
    UserIsActive: bool
    Items: list[Product] = []

