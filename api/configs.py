import os

# Change
APP_NAME = 'Coffee Gourmet'

# Optional
APP_VERSION = 1.0
SECRET_KEY = APP_NAME + 'qwertyuiopASDFGHJK1234567890#$%¨&*'

# Dont Change
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_NAME = APP_NAME.strip().lower().replace(' ', '').replace('/', '').replace(r'\\', '').replace('.', '')

APP_PATH = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(APP_PATH, '../templates')
STATIC_PATH = os.path.join(APP_PATH, '../static')
