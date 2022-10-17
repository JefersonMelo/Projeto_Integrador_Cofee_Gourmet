from sqlalchemy import Column, Integer, String, Boolean


class ProductTypeMixin(object):
    ProductTypeID = Column(Integer, primary_key=True, index=True)
    TypeName = Column(String(255), index=True)
    ProductTypeIsActive = Column(Boolean, default=True)
    ProductTypeDescription = Column(String)

