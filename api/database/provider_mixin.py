from sqlalchemy import Column, Integer, String, Boolean


class ProviderMixin(object):
    ProviderID = Column(Integer, primary_key=True, index=True)
    ProviderName = Column(String(255), unique=True, index=True)
    ProviderDescription = Column(String)
    ProviderIsActive = Column(Boolean, default=True)
