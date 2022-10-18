from sqlalchemy import Column, Integer, DateTime, func


class CarShopMixin(object):
    CarShopID = Column(Integer, primary_key=True, index=True)
    CreationDate = Column(DateTime, name='CreationDate', server_default=func.now())
