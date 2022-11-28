from typing import Optional, Tuple, List

from api.database.connection import get_session
from api.schemas.prod_subtype_schema import ProductSubtype
from api.services.prod_subtype_service import ProductSubtypeService


class ProductSubtypeUtility:

    def __init__(self):
        self.subtype_service = ProductSubtypeService()
        self.session_maker = get_session

    def create_product_subtype(
            self,
            prod_subtype: ProductSubtype
    ) -> Tuple[Optional[ProductSubtype], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.subtype_service.insert_new_product_subtype(
                    prod_subtype=prod_subtype,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_subtypes(
            self,
    ) -> Tuple[List[Optional[ProductSubtype]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.subtype_service.select_all_subtypes(
                    db=session
                )

                if not results:
                    session.rollback()
                    return [], msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return [], str(e)

    def get_subtype_by_id(
            self,
            subtype_id: int
    ) -> Tuple[Optional[Tuple[ProductSubtype]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.subtype_service.select_subtype_by_id(
                    subtype_id=subtype_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
