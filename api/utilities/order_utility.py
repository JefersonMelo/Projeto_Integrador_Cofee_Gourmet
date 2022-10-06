from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.product_schema import CreateProduct, Product
from api.services.order_service import OrderService


class OrderUtility:

    def __init__(self):
        self.items = OrderService()
        self.session_maker = get_session

    def create_item_for_user(
            self,
            user_id: int,
            item: CreateProduct
    ) -> Tuple[Optional[CreateProduct], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.items.create_item_user(
                    user_id=user_id,
                    item=item,
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
