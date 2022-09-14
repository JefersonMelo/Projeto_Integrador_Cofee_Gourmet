from fastapi import APIRouter
from .enums.tags_enum import Tags
from .routes import home, items, users

api = APIRouter()

api.include_router(home.router, prefix='/api', tags=[Tags.Home])
api.include_router(items.router, prefix='/api', tags=[Tags.Item])
api.include_router(users.router, prefix='/api', tags=[Tags.User])
