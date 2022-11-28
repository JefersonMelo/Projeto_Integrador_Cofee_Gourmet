from sqlalchemy import Column, Integer, String


class ContactMixin(object):
    ContactID = Column(Integer, primary_key=True, index=True)
    Phone_1 = Column(String(255), index=True)
    Phone_2 = Column(String(255), index=True)
