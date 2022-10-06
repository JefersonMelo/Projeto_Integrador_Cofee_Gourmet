from typing import Optional

from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class DescriptionBase(BaseModel):
    Description: Optional[str] = None


class Category(DescriptionBase, CreationBase, DeletionBase, ModificationBase):
    CategoryName: str
    CategoryIsActive: bool

    class Config:
        orm_mode = True
