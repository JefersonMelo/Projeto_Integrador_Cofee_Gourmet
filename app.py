from urllib.request import Request

from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from api.api import api
from fastapi import FastAPI

# App Instance
app = FastAPI()

# Register Api Routers
app.include_router(api)

# Cors support - Api open to public
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Gzip compression support
app.add_middleware(GZipMiddleware)

# Show React build files
app.mount('/static', StaticFiles(directory='app/build/static'), name='static')
templates = Jinja2Templates(directory='app/build')


# Serves Single Page Application files (eg: React)
@app.get('/{full_path:path}')
async def serve_spa(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})
