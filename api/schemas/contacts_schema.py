from datetime import datetime
from typing import Optional

from api.schemas.user_schema import UserInfoBase


class ContactsCreate(UserInfoBase):
    Phone_1: str
    Phone_2: Optional[str] = None

    class Config:
        orm_mode = True


class ContactsModified(ContactsCreate):
    Modified: Optional[datetime] = None
    ModifiedBy: Optional[str] = None
