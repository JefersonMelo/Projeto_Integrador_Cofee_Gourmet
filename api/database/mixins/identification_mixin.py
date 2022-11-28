from sqlalchemy import Column, Integer, String


class IdentificationMixin(object):
    IdentificationID = Column(Integer, primary_key=True, index=True)
    DocNumber = Column(String(11), index=True)
    Name = Column(String(255), index=True)
    LastName = Column(String(255), index=True)
