from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class ProductTypeBase(BaseModel):
    TypeName: str


class ProductType(ProductTypeBase, CreationBase, DeletionBase, ModificationBase):
    ProductTypeDescription: str
    ProductTypeIsActive: bool
    FK_CategoryID: int

    class Config:
        orm_mode = True
