from typing import Optional, Tuple

from sqlalchemy.engine import Result

from api.database.connection import get_session
from api.schemas.creditcard_schema import CreditCard, DeleteCreditCard, UpdateCreditCard
from api.services.creditcard_service import CreditCardService


class CreditCardUtility:

    def __init__(self):
        self.card_service = CreditCardService()
        self.session_maker = get_session

    def add_new_creditcard_by_user_id(
            self,
            creditcard: CreditCard,
            user_id: int,
    ) -> Tuple[Optional[CreditCard], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.card_service.insert_new_creditcard_by_user_id(
                    user_id=user_id,
                    creditcard=creditcard,
                    db=session
                )

                session.expunge(results)

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def get_creditcard_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[CreditCard], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.card_service.select_creditcard_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def delete_creditcard(
            self,
            creditcard: DeleteCreditCard,
    ) -> Tuple[Result, str]:

        try:
            with self.session_maker() as session:

                results, msg = self.card_service.cancel_creditcard_by_card_id(
                    creditcard=creditcard,
                    db=session
                )

                if not results:
                    session.rollback()
                    raise ConnectionError(msg)

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def edit_creditcard(
            self,
            creditcard: UpdateCreditCard,
    ):

        try:
            with self.session_maker() as session:

                results, msg = self.card_service.update_creditcard_by_card_id(
                    creditcard=creditcard,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                results, msg1 = self.get_creditcard_by_user_id(user_id=creditcard.FK_UserID)

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, e
