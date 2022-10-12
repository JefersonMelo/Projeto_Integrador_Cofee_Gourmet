from sqlalchemy import Column, Integer


class CarShopOrderRelationshipMixin(object):
    CarShopRelationShipID = Column(Integer, primary_key=True, index=True)
