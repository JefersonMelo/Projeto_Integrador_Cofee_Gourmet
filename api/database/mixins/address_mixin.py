from sqlalchemy import Column, Integer, String


class AddressMixin(object):
    AddressID = Column(Integer, primary_key=True, index=True)
    AddressName = Column(String(255), index=True)
    AddressNumber = Column(Integer, index=True)
    Complement = Column(String(255), index=True)
    ZipCode = Column(String(7), index=True)
    Planet = Column(String(255), index=True)
    Country = Column(String(2), index=True)
    District = Column(String(255), index=True)
    City = Column(String(255), index=True)
