from typing import Optional
from api.schemas.user_schema import UserInfoBase


class PaymentCreate(UserInfoBase):
    OrderName: Optional[str] = 'UserID_CarShopID_AddressID_CredCardNumber_DateNow'
    SubTotal: Optional[float] = 0.0
    Total: Optional[float] = 0.0
    Status: Optional[bool] = False

    class Config:
        orm_mode = True
