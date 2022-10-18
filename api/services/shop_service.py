from typing import Optional, Tuple
from sqlalchemy.orm import Session

from api.schemas.car_shop_schema import NewItemCarShop
from api.schemas.product_schema import CreateProduct
from api.database.models import DbCarShop


class CarShopService:

    @classmethod
    def add_item_car_shop_by_user_id_and_product_id(
            cls,
            new_item: NewItemCarShop,
            db: Session
    ) -> Tuple[Optional[DbCarShop], str]:

        try:

            results = DbCarShop(**new_item.dict())

            if not results:
                db.rollback()
                return None, 'Error'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Adicionado ao Super Carro com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def get_items(
            cls,
            db: Session,
            skip: int,
            limit: int
    ):

        try:

            results = db.query(DbCarShop).offset(skip).limit(limit).all()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e)
