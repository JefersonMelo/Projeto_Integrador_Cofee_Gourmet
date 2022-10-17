from sqlalchemy import Column, Integer, String, Boolean


class AddressMixin(object):
    UserID = Column(Integer, primary_key=True, index=True)
    UserEmail = Column(String(255), unique=True, index=True)
    UserName = Column(String(255), index=True)
    Password = Column(String)
    UserIsActive = Column(Boolean, default=True)
