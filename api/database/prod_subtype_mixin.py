from sqlalchemy import Column, Integer, String, Boolean


class ProductSubtypeMixin(object):
    ProductSubtypeID = Column(Integer, primary_key=True, index=True)
    SubTypeName = Column(String(255), index=True)
