from datetime import datetime
from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.database.models import DbTest
from api.schemas.test_schema import TestCreate
from api.services.test_service import TestsService


class TestUtility:

    def __init__(self):
        self.test_service = TestsService()
        self.session_maker = get_session

    def add_new_test(
            self,
            test: TestCreate
    ) -> Tuple[Optional[TestCreate], str]:

        try:
            with self.session_maker() as session:

                test.CreationDate = datetime.now()

                results, msg = self.test_service.insert_new_test(
                    test=test,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge(results)

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def get_tests_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[List[DbTest]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.test_service.select_tests_by_user_id(
                    user_id=user_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)
