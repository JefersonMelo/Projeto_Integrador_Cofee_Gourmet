from datetime import datetime
from typing import Union, Optional

from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: Union[str, None] = None


class CreateProduct(ItemBase):
    pass


class Product(ItemBase):
    ProductID: int
    FK_UserID: int

    class Config:
        orm_mode = True
