from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.product_schema import CreateProduct, Product
from api.services.product_service import ProductService


class ProductUtility:

    def __init__(self):
        self.items = ProductService()
        self.session_maker = get_session

    def create_product(
            self,
            product: CreateProduct
    ) -> Tuple[Optional[CreateProduct], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.items.insert_new_product(
                    product=product,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_all_items(
            self,
            skip: int,
            limit: int
    ) -> Tuple[Optional[Product], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.items.get_items(
                    skip=skip,
                    limit=limit,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
