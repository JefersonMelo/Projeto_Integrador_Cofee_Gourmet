from typing import Optional

from pydantic import BaseModel

from api.schemas.mixins_schema import DeletionBase
from api.schemas.user_schema import UserInfoBase


class CreditCardBase(BaseModel):
    CardStatus: Optional[bool] = True

    class Config:
        orm_mode = True


class CreditCard(UserInfoBase, CreditCardBase):
    CardNumber: Optional[str] = '1111 2222 3333 4444'
    UserDocNumber: Optional[str] = '000 000 000 00'
    CardFlag: Optional[str] = 'cred card'
    UserName: Optional[str] = None
    Validity: Optional[str] = 'dd/aa'
    CVC: Optional[str] = '000'

    class Config:
        orm_mode = True


class DeleteCreditCard(DeletionBase, UserInfoBase, CreditCardBase):
    CardID: Optional[int] = 0


class UpdateCreditCard(UserInfoBase, CreditCardBase):
    CardID: Optional[int] = 0
