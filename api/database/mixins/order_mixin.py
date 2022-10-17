from sqlalchemy import Column, Integer, String, Boolean, Numeric


class OrderMixin(object):
    OrderID = Column(Integer, primary_key=True, index=True)
    OrderName = Column(String(255), nullable=False, index=True)
    SubTotal = Column(Numeric(3, 2), nullable=False, index=True)
    Status = Column(Boolean, default=False)
