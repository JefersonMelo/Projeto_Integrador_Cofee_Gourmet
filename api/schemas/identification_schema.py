from datetime import datetime
from typing import Optional
from api.schemas.user_schema import UserInfoBase


class Identification(UserInfoBase):
    Name: Optional[str]
    LastName: Optional[str]
    DocNumber: Optional[str] = '11111111111'

    class Config:
        orm_mode = True


class IdentificationModified(Identification):
    Modified: Optional[datetime] = None
    ModifiedBy: Optional[str] = None
