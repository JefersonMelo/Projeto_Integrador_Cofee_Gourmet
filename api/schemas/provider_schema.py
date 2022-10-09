from typing import Optional

from pydantic import BaseModel

from api.schemas.mixins_schema import CreationBase, DeletionBase, ModificationBase


class DescriptionBase(BaseModel):
    ProviderDescription: Optional[str] = None


class Provider(DescriptionBase, CreationBase, DeletionBase, ModificationBase):
    ProviderName: str
    ProviderIsActive: bool

    class Config:
        orm_mode = True
