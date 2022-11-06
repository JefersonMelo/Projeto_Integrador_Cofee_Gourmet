from typing import Optional
from api.schemas.user_schema import UserInfoBase


class Identification(UserInfoBase):
    LastName: Optional[str]
    DocNumber: Optional[str] = '11111111111'

    class Config:
        orm_mode = True
