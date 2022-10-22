from datetime import datetime
from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.database.models import DbCarShop
from api.schemas.car_shop_schema import NewItemCarShop
from api.schemas.product_schema import CreateProduct
from api.services.shop_service import CarShopService


class CarShopUtility:

    def __init__(self):
        self.shop_service = CarShopService()
        self.session_maker = get_session

    def add_new_item_in_car_shop_by_user_id(
            self,
            new_item: NewItemCarShop
    ) -> Tuple[Optional[CreateProduct], str]:

        try:
            with self.session_maker() as session:

                new_item.Created = datetime.now()

                results, msg = self.shop_service.add_item_car_shop_by_user_id_and_product_id(
                    new_item=new_item,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_all_items_by_user_id(
            self,
            user_id: int,
    ) -> Tuple[Optional[List[DbCarShop]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.shop_service.select_user_items(
                    user_id=user_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    # def delete_item_by_user_id(
    #         self,
    #         user_id: int,
    # ) -> Tuple[Optional[List[DbCarShop]], str]:
    #
    #     try:
    #         with self.session_maker() as session:
    #
    #             results, msg = self.shop_service.select_user_items(
    #                 user_id=user_id,
    #                 db=session
    #             )
    #
    #             if not results:
    #                 session.rollback()
    #                 return None, msg
    #
    #             session.expunge_all()
    #
    #             return results, msg
    #
    #     except Exception as e:
    #         return None, str(e)
