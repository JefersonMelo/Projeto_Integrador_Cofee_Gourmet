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

    items = relationship("DbCarShop", back_populates="user")
    Address = relationship("DbAddress", back_populates="user")
    Contacts = relationship("DbContact", back_populates="user")


class DbAddress(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Address"
    AddressID = Column(Integer, primary_key=True, index=True)
    City = Column(String(255), index=True)
    Province = Column(String(255), index=True)
    Country = Column(String(2), index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    user = relationship("DbUser", back_populates="Address")


class DbContact(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Contacts"
    ContactID = Column(Integer, primary_key=True, index=True)
    Phone_1 = Column(String(255), index=True)
    Phone_2 = Column(String(255), index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    user = relationship("DbUser", back_populates="Contacts")


class DbCarShop(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "CarShop"

    CarShopID = Column(Integer, primary_key=True, index=True)
    CarTitle = Column(String(255), index=True)
    CarDescription = Column(String, index=True)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    FK_ProductID = Column(Integer, ForeignKey("Products.ProductID"))

    user = relationship("DbUser", back_populates="items")
    Products = relationship("DbProduct", back_populates="car_shop")
    relationships = relationship("DbCarShopOrderRelationShip", back_populates="car_shop")


class DbCarShopOrderRelationShip(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "CarShopOrderRelationShip"

    CarShopRelationShipID = Column(Integer, primary_key=True, index=True)
    FK_CarShopID = Column(Integer, ForeignKey("CarShop.CarShopID"))
    FK_OrderID = Column(Integer, ForeignKey("Orders.OrderID"))

    order = relationship("DbOrder", back_populates="relationships")
    car_shop = relationship("DbCarShop", back_populates="relationships")


class DbOrder(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Orders"

    OrderID = Column(Integer, primary_key=True, index=True)
    OrderName = Column(String(255), nullable=False, index=True)
    SubTotal = Column(Numeric(3, 2), nullable=False, index=True)
    Status = Column(Boolean, default=False)

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))

    relationships = relationship("DbCarShopOrderRelationShip", back_populates="order")


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

    product_type = relationship("DbProductType", back_populates="Products")
    category = relationship("DbCategory", back_populates="Products")
    car_shop = relationship("DbCarShop", back_populates="Products")


class DbProductType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductTypes"

    ProductTypeID = Column(Integer, primary_key=True, index=True)
    TypeName = Column(String(255), index=True)

    FK_CategoryID = Column(Integer, ForeignKey("Categories.CategoryID"))

    Products = relationship("DbProduct", back_populates="product_type")
    sub_type = relationship("DbProductSubType", back_populates="product_types")


class DbProductSubType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductSubTypes"

    ProductSubtypeID = Column(Integer, primary_key=True, index=True)
    SubTypeName = Column(String(255), index=True)

    FK_ProductTypeID = Column(Integer, ForeignKey("ProductTypes.ProductTypeID"))

    product_types = relationship("DbProductType", back_populates="sub_type")


class DbCategory(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Categories"

    CategoryID = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String(255), unique=True, index=True)
    Description = Column(String)
    CategoryIsActive = Column(Boolean, default=True)

    Products = relationship("DbProduct", back_populates="category")
