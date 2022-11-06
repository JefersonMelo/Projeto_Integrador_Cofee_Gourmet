from datetime import datetime
from typing import Optional
from api.schemas.user_schema import UserInfoBase


class AddressCreate(UserInfoBase):
    AddressName: Optional[str]
    AddressNumber: Optional[int]
    Complement: Optional[str]
    ZipCode: Optional[str] = '0000000'
    Planet: Optional[str] = 'TERRA'
    Country: Optional[str] = 'BR'
    District: Optional[str]
    City: Optional[str]

    class Config:
        orm_mode = True


class AddressModified(AddressCreate):
    Modified: Optional[datetime] = None
    ModifiedBy: Optional[str] = None
