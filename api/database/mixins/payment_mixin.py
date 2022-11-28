from sqlalchemy import Column, Integer, Boolean, Numeric, Text


class PaymentMixin(object):
    OrderID = Column(Integer, primary_key=True, index=True)
    OrderName = Column(Text, nullable=False, index=True)  # UserID_CarShopID_AddressID_CredCardNumber_DateNow
    SubTotal = Column(Numeric(10, 2), nullable=False, index=True)
    Total = Column(Numeric(10, 2), nullable=False, index=True)
    Status = Column(Boolean, default=False)
