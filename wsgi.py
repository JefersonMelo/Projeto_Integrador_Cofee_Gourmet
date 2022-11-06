# import asyncio
import os
import sys

from fastapi.openapi.models import Server

import app

this_files_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(this_files_dir)
sys.stdout.reconfigure(encoding='utf-8')
Server(app, host='0.0.0.0', port=8999, url_scheme='http')
# asyncio.Server(app, host='0.0.0.0', port=8999, url_scheme='http')
