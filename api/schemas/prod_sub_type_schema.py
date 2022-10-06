from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class TypeBase(BaseModel):
    CategoryIsActive: bool
    FK_CategoryID: int


class ProductType(TypeBase, CreationBase, DeletionBase, ModificationBase):
    TypeName: str

    class Config:
        orm_mode = True
