from sqlalchemy import Column, Integer


class CarShopMixin(object):
    CarShopID = Column(Integer, primary_key=True, index=True)
