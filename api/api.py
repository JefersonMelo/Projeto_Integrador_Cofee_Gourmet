from fastapi import APIRouter
from .enums.tags_enum import Tags
from .routes import home, products, users, categories, product_type, prod_subtype, provider, car_shop, contacts, address

api = APIRouter()

api.include_router(home.router, prefix='/api', tags=[Tags.Home])
api.include_router(products.router, prefix='/api', tags=[Tags.Product])
api.include_router(users.router, prefix='/api', tags=[Tags.User])
api.include_router(contacts.router, prefix='/api', tags=[Tags.Contacts])
api.include_router(address.router, prefix='/api', tags=[Tags.Address])
api.include_router(categories.router, prefix='/api', tags=[Tags.Category])
api.include_router(product_type.router, prefix='/api', tags=[Tags.ProductType])
api.include_router(prod_subtype.router, prefix='/api', tags=[Tags.ProductSubtype])
api.include_router(provider.router, prefix='/api', tags=[Tags.Provider])
api.include_router(car_shop.router, prefix='/api', tags=[Tags.CarShop])
