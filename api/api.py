from fastapi import APIRouter
from .enums.tags_enum import Tags
from .routes import home, products, users, categories

api = APIRouter()

api.include_router(home.router, prefix='/api', tags=[Tags.Home])
api.include_router(products.router, prefix='/api', tags=[Tags.Product])
api.include_router(users.router, prefix='/api', tags=[Tags.User])
api.include_router(categories.router, prefix='/api', tags=[Tags.Category])
