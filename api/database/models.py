from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship
from .database import Base
from api.database.mixins.base_mixins import DeletionMixin, ModificationMixin, CreationMixin
from api.database.mixins.address_mixin import AddressMixin
from api.database.mixins.category_mixin import CategoryMixin
from api.database.mixins.contact_mixin import ContactMixin
from api.database.mixins.order_mixin import OrderMixin
from api.database.mixins.prod_subtype_mixin import ProductSubtypeMixin
from api.database.mixins.prod_type_mixin import ProductTypeMixin
from api.database.mixins.product_mixin import ProductMixin
from api.database.mixins.provider_mixin import ProviderMixin
from api.database.mixins.rating_mixin import RatingMixin
from api.database.mixins.shop_mixin import CarShopMixin
# from api.database.mixins.shop_relationship_mixin import CarShopOrderRelationshipMixin
from api.database.mixins.user_mixin import UserMixin


class DbUser(Base, UserMixin, DeletionMixin, ModificationMixin):
    __tablename__ = "Users"

    Items = relationship("DbCarShop", back_populates="User")
    Address = relationship("DbAddress", back_populates="User")
    Contacts = relationship("DbContact", back_populates="User")
    Rating = relationship("DbRating", back_populates="User")


class DbAddress(Base, AddressMixin, DeletionMixin, CreationMixin):
    __tablename__ = "Address"

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    User = relationship("DbUser", back_populates="Address")


class DbContact(Base, ContactMixin, DeletionMixin, CreationMixin):
    __tablename__ = "Contacts"

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    User = relationship("DbUser", back_populates="Contacts")


class DbCarShop(Base, CarShopMixin, DeletionMixin, CreationMixin):
    __tablename__ = "CarShop"

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    FK_ProductID = Column(Integer, ForeignKey("Products.ProductID"))
    User = relationship("DbUser", back_populates="Items")
    Products = relationship("DbProduct", back_populates="CarShop")
    # Relationships = relationship("DbCarShopOrderRelationship", back_populates="CarShop")


class DbOrder(Base, OrderMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Orders"

    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    FK_CarShopID = Column(Integer, ForeignKey("CarShop.CarShopID"))
    # Relationships = relationship("DbCarShopOrderRelationship", back_populates="Order")


class DbProduct(Base, ProductMixin, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Products"

    FK_CategoryID = Column(Integer, ForeignKey("Categories.CategoryID"), nullable=False)
    FK_ProductTypeID = Column(Integer, ForeignKey("ProductTypes.ProductTypeID"), nullable=False)
    FK_ProductSubtypeID = Column(Integer, ForeignKey("ProductSubtypes.ProductSubtypeID"), nullable=False)
    FK_ProviderID = Column(Integer, ForeignKey("Providers.ProviderID"), nullable=False)

    ProductType = relationship("DbProductType", back_populates="Products")
    Subtype = relationship("DbProductSubtype", back_populates="Products")
    Category = relationship("DbCategory", back_populates="Products")
    CarShop = relationship("DbCarShop", back_populates="Products")
    Provider = relationship("DbProvider", back_populates="Products")
    Rating = relationship("DbRating", back_populates="Products")


class DbProductType(Base, ProductTypeMixin, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductTypes"

    FK_CategoryID = Column(Integer, ForeignKey("Categories.CategoryID"))
    Products = relationship("DbProduct", back_populates="ProductType")
    Subtype = relationship("DbProductSubtype", back_populates="ProductTypes")
    Category = relationship("DbCategory", back_populates="ProductsTypes")


class DbProductSubtype(Base, ProductSubtypeMixin, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "ProductSubtypes"

    FK_ProductTypeID = Column(Integer, ForeignKey("ProductTypes.ProductTypeID"))
    ProductTypes = relationship("DbProductType", back_populates="Subtype")
    Products = relationship("DbProduct", back_populates="Subtype")


class DbCategory(Base, CategoryMixin, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Categories"

    Products = relationship("DbProduct", back_populates="Category")
    ProductsTypes = relationship("DbProductType", back_populates="Category")


class DbProvider(Base, ProviderMixin, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Providers"

    Products = relationship("DbProduct", back_populates="Provider")


class DbRating(Base, RatingMixin, ModificationMixin, CreationMixin):
    __tablename__ = "Ratings"

    FK_ProductID = Column(Integer, ForeignKey("Products.ProductID"))
    FK_UserID = Column(Integer, ForeignKey("Users.UserID"))
    Products = relationship("DbProduct", back_populates="Rating")
    User = relationship("DbUser", back_populates="Rating")

# class DbCarShopOrderRelationship(Base, CarShopOrderRelationshipMixin,
# DeletionMixin, ModificationMixin, CreationMixin):
#     __tablename__ = "CarShopOrderRelationShip"
#
#     FK_CarShopID = Column(Integer, ForeignKey("CarShop.CarShopID"))
#     FK_OrderID = Column(Integer, ForeignKey("Orders.OrderID"))
#     Order = relationship("DbOrder", back_populates="Relationships")
#     CarShop = relationship("DbCarShop", back_populates="Relationships")
