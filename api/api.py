from fastapi import APIRouter
from .enums.tags_enum import Tags
from .routes import products, users, identification, categories, product_type, prod_subtype, provider, car_shop, \
    contacts, address, payment, creditcard, test

api = APIRouter()

api.include_router(products.router, prefix='/api', tags=[Tags.Product])
api.include_router(users.router, prefix='/api', tags=[Tags.User])
api.include_router(contacts.router, prefix='/api', tags=[Tags.Contacts])
api.include_router(identification.router, prefix='/api', tags=[Tags.Identification])
api.include_router(address.router, prefix='/api', tags=[Tags.Address])
api.include_router(categories.router, prefix='/api', tags=[Tags.Category])
api.include_router(product_type.router, prefix='/api', tags=[Tags.ProductType])
api.include_router(prod_subtype.router, prefix='/api', tags=[Tags.ProductSubtype])
api.include_router(provider.router, prefix='/api', tags=[Tags.Provider])
api.include_router(car_shop.router, prefix='/api', tags=[Tags.CarShop])
api.include_router(payment.router, prefix='/api', tags=[Tags.Payment])
api.include_router(creditcard.router, prefix='/api', tags=[Tags.CreditCard])
api.include_router(test.router, prefix='/api', tags=[Tags.Test])
