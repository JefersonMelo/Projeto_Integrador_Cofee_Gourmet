from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.schemas.prod_type_schema import ProductType
from api.services.prod_type_service import ProductTypeService


class TypeUtility:

    def __init__(self):
        self.type_service = ProductTypeService()
        self.session_maker = get_session

    def create_product_type(
            self,
            product_type: ProductType
    ) -> Tuple[Optional[ProductType], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.type_service.insert_new_product_type(
                    product_type=product_type,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_all_product_types(
            self
    ) -> Tuple[Optional[List[ProductType]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.type_service.get_product_type(
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_product_type_by_id(
            self,
            product_type_id: int
    ) -> Tuple[Optional[List[ProductType]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.type_service.select_product_type_by_id(
                    product_type_id=product_type_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
