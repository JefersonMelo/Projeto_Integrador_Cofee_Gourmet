from sqlalchemy import Column, Integer, Boolean, String


class CreditCardMixin(object):
    CardID = Column(Integer, primary_key=True, index=True)
    CardNumber = Column(String(16), nullable=False, index=True)
    UserDocNumber = Column(String(11), nullable=False, index=True)
    CardFlag = Column(String(255), nullable=False, index=True)
    UserName = Column(String(255), nullable=False, index=True)
    Validity = Column(String(5), nullable=False, index=True)
    CVC = Column(String(3), nullable=False)
    CardStatus = Column(Boolean, default=True)
