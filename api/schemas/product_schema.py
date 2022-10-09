from datetime import datetime

from pydantic import BaseModel
from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class ProductBase(BaseModel):
    ProductName: str
    ProductDescription: str
    Price: float


class Product(ProductBase):
    pass


class CreateProduct(ProductBase, CreationBase, DeletionBase, ModificationBase):
    FK_CategoryID: int
    FK_ProviderID: int
    Rating: int
    Discount: float
    ValidityStartDate: datetime
    ValidityEndDate: datetime
    WeightInGrams: float

    class Config:
        orm_mode = True
