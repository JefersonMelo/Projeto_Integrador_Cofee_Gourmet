from typing import Optional, Tuple

from sqlalchemy.orm import Session

from api.database.models import DbCarShop
from api.schemas.product_schema import CreateProduct


class OrderService:

    @classmethod
    def create_item_user(
            cls,
            user_id: int,
            item: CreateProduct,
            db: Session
    ) -> Tuple[Optional[DbCarShop], str]:

        try:

            results = DbCarShop(**item.dict(), fk_user_id=user_id)

            if not results:
                db.rollback()
                return None, 'Error'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Success'

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
