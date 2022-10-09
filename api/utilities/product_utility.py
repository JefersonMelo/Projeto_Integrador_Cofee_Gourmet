from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.schemas.product_schema import CreateProduct, Product
from api.services.product_service import ProductService


class ProductUtility:

    def __init__(self):
        self.prod_service = ProductService()
        self.session_maker = get_session

    def create_product(
            self,
            product: CreateProduct
    ) -> Tuple[Optional[CreateProduct], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.prod_service.insert_new_product(
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

    def get_products(
            self,
            skip: int,
            limit: int
    ) -> Tuple[List[Optional[Product]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.prod_service.select_all_products(
                    skip=skip,
                    limit=limit,
                    db=session
                )

                if not results:
                    session.rollback()
                    return [], msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return [], str(e)

    def get_product_and_categories(
            self,
            product_id
    ) -> Tuple[Optional[Tuple[Product]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.prod_service.select_product_and_categories_by_product_id(
                    product_id=product_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
