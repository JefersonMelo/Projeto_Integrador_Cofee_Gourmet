from datetime import datetime
from typing import Optional
from api.schemas.user_schema import UserInfoBase


class TestCreate(UserInfoBase):
    UserName: Optional[str] = None
    TestOK: Optional[str] = None
    TestNOK: Optional[str] = None
    NotTested: Optional[str] = None
    Suggestion: Optional[str] = None
    CreationDate: Optional[datetime] = None

    class Config:
        orm_mode = True


class TestModified(TestCreate):
    Modified: Optional[datetime] = None
    ModifiedBy: Optional[str] = None
