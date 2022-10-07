from fastapi import APIRouter
from .enums.tags_enum import Tags
from .routes import home, products, users, categories, product_type, prod_subtype

api = APIRouter()

api.include_router(home.router, prefix='/api', tags=[Tags.Home])
api.include_router(products.router, prefix='/api', tags=[Tags.Product])
api.include_router(users.router, prefix='/api', tags=[Tags.User])
api.include_router(categories.router, prefix='/api', tags=[Tags.Category])
api.include_router(product_type.router, prefix='/api', tags=[Tags.ProductType])
api.include_router(prod_subtype.router, prefix='/api', tags=[Tags.ProductSubtype])
