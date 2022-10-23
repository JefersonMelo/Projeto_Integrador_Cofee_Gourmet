from typing import Optional

from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, PaymentConfirmedBase


class CarShopBase(BaseModel):
    FK_UserID: int


class NewItemCarShop(CarShopBase, CreationBase, DeletionBase):
    FK_ProductID: int

    class Config:
        orm_mode = True


class RemoveItemCarShop(NewItemCarShop):
    CarShopID: Optional[int]


class PaymentConfirmed(NewItemCarShop, PaymentConfirmedBase):
    pass
