from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class SubTypeBase(BaseModel):
    SubTypeName: str


class ProductSubtype(SubTypeBase, CreationBase, DeletionBase, ModificationBase):
    FK_ProductTypeID: int

    class Config:
        orm_mode = True
