from sqlalchemy import Column, Integer, String


class CarShopMixin(object):
    CarShopID = Column(Integer, primary_key=True, index=True)
    CarTitle = Column(String(255), index=True)
    CarDescription = Column(String, index=True)
