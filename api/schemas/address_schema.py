from typing import Optional
from api.schemas.user_schema import UserInfoBase


class AddressCreate(UserInfoBase):
    AddressName: str
    AddressNumber: int
    Complement: Optional[str]
    Planet: Optional[str] = 'TERRA'
    Country: Optional[str] = 'BR'
    District: str
    City: str

    class Config:
        orm_mode = True
