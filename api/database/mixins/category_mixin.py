from sqlalchemy import Column, Integer, String, Boolean


class CategoryMixin(object):
    CategoryID = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String(255), unique=True, index=True)
    Description = Column(String)
    CategoryIsActive = Column(Boolean, default=True)
