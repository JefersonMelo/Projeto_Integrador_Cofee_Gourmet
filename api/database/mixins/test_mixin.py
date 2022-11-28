from sqlalchemy import Column, Integer, String, DateTime, Text


class TestMixin(object):
    TestID = Column(Integer, primary_key=True, index=True)
    UserName = Column(String(255), index=True)
    TestOK = Column(Text)
    TestNOK = Column(Text)
    NotTested = Column(Text)
    Suggestion = Column(Text)
    CreationDate = Column(DateTime, name='CreationDate')

