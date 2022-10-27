from typing import Optional

from pydantic import BaseModel

from api.schemas.product_schema import Product


class UserInfoBase(BaseModel):
    FK_UserID: int


class UserBase(BaseModel):
    UserEmail: str


class UserCreate(UserBase):
    UserName: str
    Password: str
    UserIsActive: Optional[bool] = True

    class Config:
        orm_mode = True


class UserLogin(UserBase):
    Password: str

    class Config:
        orm_mode = True


class User(UserCreate):
    UserIsActive: bool
    Items: list[Product] = []
