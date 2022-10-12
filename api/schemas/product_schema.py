from datetime import datetime

from pydantic import BaseModel
from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class ProductBase(BaseModel):
    ProductName: str
    FullDescription: str
    ShortDescription: str
    Price: float


class Product(ProductBase):
    pass


class CreateProduct(ProductBase, CreationBase, DeletionBase, ModificationBase):
    FK_CategoryID: int
    FK_ProviderID: int
    FK_ProductTypeID: int
    TotalRating: int
    Discount: int
    ValidityStartDate: datetime
    ValidityEndDate: datetime
    WeightInGrams: int

    class Config:
        orm_mode = True
