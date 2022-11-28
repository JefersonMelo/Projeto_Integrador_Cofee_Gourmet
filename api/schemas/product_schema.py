from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class ProductSelect(BaseModel):
    FK_CategoryID: int
    FK_ProductTypeID: int
    FK_ProductSubtypeID: int


class ProductBase(BaseModel):
    ProductName: str
    FullDescription: str
    ShortDescription: str
    Price: float


class Product(ProductBase):
    pass


class CreateProduct(ProductBase, CreationBase, DeletionBase, ModificationBase, ProductSelect):
    FK_ProviderID: int
    TotalRating: Optional[int] = 0
    Discount: Optional[int] = 0
    DiscountPrice: Optional[float] = 0
    ValidityStartDate: datetime
    ValidityEndDate: datetime
    WeightInGrams: int

    class Config:
        orm_mode = True
