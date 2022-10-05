from datetime import datetime
from typing import Union, Optional

from pydantic import BaseModel


class CreationBase(BaseModel):
    CreatedBy: Optional[str] = None
    Created: Optional[datetime] = None


class ModificationBase(BaseModel):
    ModifiedBy: Optional[str] = None
    Modified: Optional[datetime] = None


class DeletionBase(BaseModel):
    DeletedBy: Optional[str] = None
    Deleted: Optional[datetime] = None


class UserBase(BaseModel):
    email: str


class DescriptionBase(BaseModel):
    Description: Optional[str] = None


class UserCreate(UserBase):
    name: str
    password: str

    class Config:
        orm_mode = True


class UserLogin(UserBase):
    password: str

    class Config:
        orm_mode = True


class ItemBase(BaseModel):
    title: str
    description: Union[str, None] = None


class CreateProduct(ItemBase):
    pass


class Product(ItemBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    is_active: bool
    items: list[Product] = []


class Category(DescriptionBase, CreationBase, DeletionBase, ModificationBase):
    CategoryName: str
    CategoryIsActive: bool

    class Config:
        orm_mode = True
