from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, PaymentConfirmedBase


class CarShopBase(BaseModel):
    FK_UserID: int


class NewItemCarShop(CarShopBase, CreationBase, DeletionBase):
    FK_ProductID: int

    class Config:
        orm_mode = True


class PaymentConfirmed(NewItemCarShop, PaymentConfirmedBase):
    pass
