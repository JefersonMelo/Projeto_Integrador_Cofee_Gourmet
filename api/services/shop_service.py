from datetime import datetime
from typing import Optional, Tuple, List, Union

from sqlalchemy import and_, update, func
from sqlalchemy.engine import Result
from sqlalchemy.orm import Session, joinedload

from api.schemas.car_shop_schema import NewItemCarShop
from api.database.models import DbCarShop, DbProduct


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
            return None, str(e.detail)

    @classmethod
    def select_user_items(
            cls,
            db: Session,
            user_id: int
    ) -> Tuple[Optional[List[DbCarShop]], str]:

        try:

            results = db.query(
                DbCarShop
            ).join(
                DbProduct
            ).filter(
                DbCarShop.FK_UserID == user_id,
                and_(DbCarShop.Deleted.is_(None))
            ).filter(
                DbProduct.ProductID == DbCarShop.FK_ProductID,
                and_(DbCarShop.Deleted.is_(None),
                     DbCarShop.PaymentDate.is_(None))
            ).options(
                joinedload(DbCarShop.Products)
            ).all()

            if not results:
                return None, 'Erro Ao Buscar Itens Do Carrinho'

            return results, 'Carrinho Carregado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def delete_item_car_shop_by_user_id(
            cls,
            db: Session,
            user_id: int,
            product_id: int,
            car_id: int,
    ):

        try:
            # SQLite dont supported returning
            # .returning(
            # DbCarShop
            # )

            results = db.execute(
                update(
                    DbCarShop
                ).where(
                    DbCarShop.FK_UserID == user_id,
                    DbCarShop.CarShopID == car_id,
                    DbCarShop.FK_ProductID == product_id,
                    and_(DbCarShop.Deleted.is_(None)),
                ).values(
                    Deleted=datetime.now()
                )
            )

            if not results:
                raise ConnectionError('Erro Ao Deletar Item Do Carrinho')

            return results, 'Item Deletado Do Carrinho Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)
