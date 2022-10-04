from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric
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

    items = relationship("DbCarShop", back_populates="user")
    address = relationship("DbAddress", back_populates="user")
    contacts = relationship("DbContact", back_populates="user")


class DbAddress(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String(255), index=True)
    province = Column(String(255), index=True)
    country = Column(String(2), index=True)

    fk_user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("DbUser", back_populates="address")


class DbContact(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    phone_1 = Column(String(255), index=True)
    phone_2 = Column(String(255), index=True)
    email = Column(String(255), index=True)

    fk_user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("DbUser", back_populates="contacts")


class DbCarShop(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "carShop"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(String, index=True)

    fk_user_id = Column(Integer, ForeignKey("users.id"))
    fk_product_id = Column(Integer, ForeignKey("products.id"))

    user = relationship("DbUser", back_populates="items")
    products = relationship("DbProduct", back_populates="car_shop")
    relationships = relationship("DbCarShopOrderRelationShip", back_populates="car_shop")


class DbCarShopOrderRelationShip(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "carShopOrderRelationShip"

    id = Column(Integer, primary_key=True, index=True)
    fk_car_shop_id = Column(Integer, ForeignKey("carShop.id"))
    fk_order_id = Column(Integer, ForeignKey("orders.id"))

    order = relationship("DbOrder", back_populates="relationships")
    car_shop = relationship("DbCarShop", back_populates="relationships")


class DbOrder(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    sub_total = Column(Numeric(3, 2), nullable=False, index=True)
    status = Column(Boolean, default=False)

    fk_user_id = Column(Integer, ForeignKey("users.id"))

    relationships = relationship("DbCarShopOrderRelationShip", back_populates="order")


class DbProduct(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(String, nullable=False, index=True)
    rating = Column(Integer, index=True)

    price = Column(Numeric(3, 2), nullable=False, index=True)
    discount = Column(Numeric(0, 2), nullable=False, index=True)

    validityStartDate = Column(DateTime, name='validityStartDate', nullable=False)
    validityEndDate = Column(DateTime, name='validityEndDate', nullable=False)

    product_type = relationship("DbProductType", back_populates="products")
    category = relationship("DbCategory", back_populates="products")
    car_shop = relationship("DbCarShop", back_populates="products")


class DbProductType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "productTypes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)

    fk_product_id = Column(Integer, ForeignKey("products.id"))
    fk_category_id = Column(Integer, ForeignKey("categories.id"))

    products = relationship("DbProduct", back_populates="product_type")
    sub_type = relationship("DbProductSubType", back_populates="product_types")


class DbProductSubType(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "productSubTypes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)

    fk_product_type_id = Column(Integer, ForeignKey("productTypes.id"))

    product_types = relationship("DbProductType", back_populates="sub_type")


class DbCategory(Base, DeletionMixin, ModificationMixin, CreationMixin):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)

    fk_product_id = Column(Integer, ForeignKey("products.id"))

    products = relationship("DbProduct", back_populates="category")
