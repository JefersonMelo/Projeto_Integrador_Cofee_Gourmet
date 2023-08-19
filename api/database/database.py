from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from api.configs import POSTGRESQL

SQLALCHEMY_DATABASE_URL = "sqlite:///api/database/data/coffee_break.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# def get_engine(user, password, host, port, db):
#     url = f"postgresql://{user}:{password}@{host}:{port}/{db}"
#     if not database_exists(url):
#         create_database(url)
#
#     return create_engine(url, pool_size=50, echo=False)
#
#
# engine = get_engine(**POSTGRESQL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
