from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.schemas.category_schema import Category
from api.services.category_service import CategoryService


class CategoryUtility:

    def __init__(self):
        self.category_service = CategoryService()
        self.session_maker = get_session

    def create_new_category(
            self,
            category: Category
    ) -> Tuple[Optional[Category], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.category_service.insert_new_category(
                    category=category,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_all_categories(
            self
    ) -> Tuple[Optional[List[Category]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.category_service.select_categories(
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_category_by_id(
            self,
            category_id: int
    ) -> Tuple[Optional[List[Category]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.category_service.select_category_by_id(
                    category_id=category_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
