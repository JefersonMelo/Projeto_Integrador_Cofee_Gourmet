import os

# Change
APP_NAME = 'Coffee Gourmet'

# Optional
APP_VERSION = 1.0
SECRET_KEY = '6c84000n*5423ov#u9h6f@&+%1ph4rxi(t1!83z+1u@(%2hh!6'

POSTGRESQL = {
    'user': "postgres",
    'password': '20858036',
    'host': 'localhost',
    'port': 5432,
    'db': 'coffee_break',
}

# Dont Change
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_NAME = APP_NAME.strip().lower().replace(' ', '').replace('/', '').replace(r'\\', '').replace('.', '')

APP_PATH = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(APP_PATH, '../templates')
STATIC_PATH = os.path.join(APP_PATH, '../static')
