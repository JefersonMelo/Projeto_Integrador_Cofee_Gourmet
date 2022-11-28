from typing import Optional, Tuple, List
from sqlalchemy.orm import Session

from api.database.models import DbAddress, DbPayment
from api.schemas.payment_schema import PaymentCreate


class PaymentService:

    @classmethod
    def insert_realization_payment_by_user_id(
            cls,
            payment: PaymentCreate,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[DbPayment], str]:

        try:

            results = DbPayment(**payment.dict())

            if not results:
                db.rollback()
                raise ConnectionError('Erro Ao Realizar Pagamento')

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Compra Realizada Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def select_payments_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[List[DbPayment]], str]:

        try:

            results = db.query(DbPayment).filter(DbPayment.FK_UserID == user_id).all()

            if not results:
                db.rollback()
                return None, 'Não Foram Realizadas Compras Em Nossa Loja'

            return results, 'Compras Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)
