from datetime import datetime
from typing import Optional, Tuple

from sqlalchemy import and_, update
from sqlalchemy.engine import Result
from sqlalchemy.orm import Session

from api.database.models import DbCreditCard
from api.schemas.creditcard_schema import CreditCard, DeleteCreditCard, UpdateCreditCard


class CreditCardService:

    @classmethod
    def insert_new_creditcard_by_user_id(
            cls,
            creditcard: CreditCard,
            user_id: int,
            db: Session
    ):

        try:

            results = DbCreditCard(**creditcard.dict())

            if not results:
                db.rollback()
                raise ConnectionError('Erro Ao Adicionar Cartão')

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Cartão Adicionado Com Sucesso!'

        except Exception as e:
            return None, e

    @classmethod
    def select_creditcard_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ):

        try:

            results = db.query(
                DbCreditCard
            ).filter(
                DbCreditCard.FK_UserID == user_id,
                DbCreditCard.CardStatus.is_(True),
                and_(
                    DbCreditCard.Deleted.is_(None),
                    DbCreditCard.DeletedBy.is_(None),
                )
            ).first()

            if not results:
                db.rollback()
                return None, 'Não Há Cartão Cadastrado'

            return results, 'Cartão Localizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def cancel_creditcard_by_card_id(
            cls,
            db: Session,
            creditcard: DeleteCreditCard,
    ):

        try:
            results = db.execute(
                update(
                    DbCreditCard
                ).where(
                    DbCreditCard.FK_UserID == creditcard.FK_UserID,
                    DbCreditCard.CardID == creditcard.CardID,
                    and_(DbCreditCard.Deleted.is_(None)),
                ).values(
                    Deleted=datetime.now(),
                    DeletedeBy=creditcard.DeletedBy,
                )
            )

            if not results:
                raise ConnectionError('Erro Ao Deletar Cartão')

            return results, 'Cartão Deletado Com Sucesso!'

        except Exception as e:
            return None, e

    @classmethod
    def update_creditcard_by_card_id(
            cls,
            db: Session,
            creditcard: UpdateCreditCard,
    ):
        try:
            results = db.execute(
                update(
                    DbCreditCard
                ).where(
                    DbCreditCard.FK_UserID == creditcard.FK_UserID,
                    DbCreditCard.CardID == creditcard.CardID,
                    and_(DbCreditCard.Deleted.is_(None)),
                ).values(**creditcard.dict())
            )

            if not results:
                raise ConnectionError('Erro Ao Alterar Cartão')

            return results, 'Cartão Alterado Com Sucesso!'

        except Exception as e:
            return None, e
