from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CreationBase(BaseModel):
    CreatedBy: Optional[str] = None
    Created: Optional[datetime] = None

    class Config:
        orm_mode = True


class ModificationBase(BaseModel):
    ModifiedBy: Optional[str] = None
    Modified: Optional[datetime] = None

    class Config:
        orm_mode = True


class DeletionBase(BaseModel):
    DeletedBy: Optional[str] = None
    Deleted: Optional[datetime] = None

    class Config:
        orm_mode = True


class PaymentConfirmedBase(BaseModel):
    PaymentDate: Optional[datetime] = None

    class Config:
        orm_mode = True
