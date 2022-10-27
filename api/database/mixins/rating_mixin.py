from sqlalchemy import Column, Integer


class RatingMixin(object):
    RatingID = Column(Integer, primary_key=True, index=True)
    Rating = Column(Integer, index=True)
