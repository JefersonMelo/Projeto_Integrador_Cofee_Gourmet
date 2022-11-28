from datetime import datetime
from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.identification_schema import Identification, IdentificationModified
from api.services.identification_service import IdentificationService


class IdentificationUtility:

    def __init__(self):
        self.identification_service = IdentificationService()
        self.session_maker = get_session

    def added_new_identification(
            self,
            user_id: int,
            identification: Identification
    ) -> Tuple[Optional[Identification], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.identification_service.insert_new_identification(
                    identification=identification,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            session.rollback()
            return None, str(e.detail)

    def get_identification_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[Identification], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.identification_service.select_identification_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            session.rollback()
            return None, str(e.detail)

    def edit_identification_by_user_id(
            self,
            user_id: int,
            identification: IdentificationModified
    ) -> Tuple[Optional[IdentificationModified], str]:

        try:
            with self.session_maker() as session:

                identification.Modified = datetime.now()

                result, msg = self.identification_service.update_identification_by_user_id(
                    user_id=user_id,
                    identification=identification,
                    db=session
                )

                if not result:
                    raise ConnectionError(msg)

                results, _msg = self.identification_service.select_identification_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)
