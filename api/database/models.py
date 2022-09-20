from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base
from .mixins import DeletionMixin, ModificationMixin, CreationMixin


class DbUser(Base, DeletionMixin, ModificationMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    name = Column(String(255), index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("DbItem", back_populates="owner")


class DbItem(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("DbUser", back_populates="items")

