from sqlalchemy import Column, Integer, String, DateTime, Numeric


class ProductMixin(object):
    ProductID = Column(Integer, primary_key=True, index=True)
    ProductName = Column(String(255), nullable=False, index=True)
    FullDescription = Column(String, nullable=False, index=True)
    ShortDescription = Column(String, nullable=False, index=True)
    TotalRating = Column(Integer, index=True)
    WeightInGrams = Column(Integer, index=True)
    Price = Column(Numeric(3, 2), nullable=False, index=True)
    Discount = Column(Integer, nullable=True, index=True)
    ValidityStartDate = Column(DateTime, name='validityStartDate', nullable=False)
    ValidityEndDate = Column(DateTime, name='validityEndDate', nullable=False)
