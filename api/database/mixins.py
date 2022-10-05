from sqlalchemy import Column, DateTime, String, func


class CreationMixin(object):
    Created = Column(DateTime, name='Created', server_default=func.now())
    CreatedBy = Column(String(255), name='CreatedBy', nullable=False)


class DeletionMixin(object):
    Deleted = Column(DateTime, name='Deleted', nullable=True)
    DeletedBy = Column(String(255), name='DeletedBy', nullable=True)


class ModificationMixin(object):
    Modified = Column(DateTime, name='Modified', nullable=True)
    ModifiedBy = Column(String(255), name='ModifiedBy', nullable=True)
