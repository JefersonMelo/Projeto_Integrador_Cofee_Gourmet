from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric
from sqlalchemy.orm import relationship

from .database import Base
from .mixins import DeletionMixin, ModificationMixin, CreationMixin


class DbUser(Base, DeletionMixin, ModificationMixin):
    __tablename__ = "Users"

    UserID = Column(Integer, primary_key=True, index=True)
    UserEmail = Column(String(255), unique=True, index=True)
    UserName = Column(String(255), index=True)
    Password = Column(String)
    UserIsActive = Column(Boolean, default=True)

    Items = relationship("DbCarShop", back_populates="User")
    Address = relationship("DbAddress", back_populates="User")
    Contacts = relationship("DbContact", back_populates="User")


class DbAddress(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Address"
    AddressID = Column(Integer, primary_key=True, index=True)
    City = Column(String(255), index=True)
    Province = Column(String(255), index=True)
    Country = Column(String(2), index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    User = relationship("DbUser", back_populates="Address")


class DbContact(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Contacts"
    ContactID = Column(Integer, primary_key=True, index=True)
    Phone_1 = Column(String(255), index=True)
    Phone_2 = Column(String(255), index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    User = relationship("DbUser", back_populates="Contacts")


class DbCarShop(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "CarShop"

    CarShopID = Column(Integer, primary_key=True, index=True)
    CarTitle = Column(String(255), index=True)
    CarDescription = Column(String, index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    FK_ProductID = Column(Integer, ForeignKey("Products.ProductID"))

    User = relationship("DbUser", back_populates="Items")
    Products = relationship("DbProduct", back_populates="CarShop")
    Relationships = relationship("DbCarShopOrderRelationShip", back_populates="CarShop")


class DbCarShopOrderRelationShip(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "CarShopOrderRelationShip"

    CarShopRelationShipID = Column(Integer, primary_key=True, index=True)
    FK_CarShopID = Column(Integer, ForeignKey("CarShop.CarShopID"))
    FK_OrderID = Column(Integer, ForeignKey("Orders.OrderID"))

    Order = relationship("DbOrder", back_populates="Relationships")
    CarShop = relationship("DbCarShop", back_populates="Relationships")


class DbOrder(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Orders"

    OrderID = Column(Integer, primary_key=True, index=True)
    OrderName = Column(String(255), nullable=False, index=True)
    SubTotal = Column(Numeric(3, 2), nullable=False, index=True)
    Status = Column(Boolean, default=False)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    Relationships = relationship("DbCarShopOrderRelationShip", back_populates="Order")


class DbProduct(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Products"

    ProductID = Column(Integer, primary_key=True, index=True)
    ProductName = Column(String(255), nullable=False, index=True)
    ProductDescription = Column(String, nullable=False, index=True)
    Rating = Column(Integer, index=True)

    Price = Column(Numeric(3, 2), nullable=False, index=True)
    Discount = Column(Numeric(0, 2), nullable=False, index=True)

    FK_CategoryID = Column(Integer, ForeignKey("Categories.CategoryID"))
    FK_ProductTypeID = Column(Integer, ForeignKey("ProductTypes.ProductTypeID"))

    ValidityStartDate = Column(DateTime, name='validityStartDate', nullable=False)
    ValidityEndDate = Column(DateTime, name='validityEndDate', nullable=False)

    ProductType = relationship("DbProductType", back_populates="Products")
    Category = relationship("DbCategory", back_populates="Products")
    CarShop = relationship("DbCarShop", back_populates="Products")


class DbProductType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductTypes"

    ProductTypeID = Column(Integer, primary_key=True, index=True)
    TypeName = Column(String(255), index=True)
    ProductTypeIsActive = Column(Boolean, default=True)
    ProductTypeDescription = Column(String)

    FK_CategoryID = Column(Integer, ForeignKey("Categories.CategoryID"))

    Products = relationship("DbProduct", back_populates="ProductType")
    SubType = relationship("DbProductSubType", back_populates="ProductTypes")
    Category = relationship("DbCategory", back_populates="ProductsTypes")


class DbProductSubType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductSubTypes"

    ProductSubtypeID = Column(Integer, primary_key=True, index=True)
    SubTypeName = Column(String(255), index=True)

    FK_ProductTypeID = Column(Integer, ForeignKey("ProductTypes.ProductTypeID"))

    ProductTypes = relationship("DbProductType", back_populates="SubType")


class DbCategory(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Categories"

    CategoryID = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String(255), unique=True, index=True)
    Description = Column(String)
    CategoryIsActive = Column(Boolean, default=True)

    Products = relationship("DbProduct", back_populates="Category")
    ProductsTypes = relationship("DbProductType", back_populates="Category")
