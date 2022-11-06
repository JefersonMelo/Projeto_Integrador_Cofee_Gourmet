from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.address_schema import AddressCreate
from api.schemas.payment_schema import PaymentCreate
from api.services.payment_service import PaymentService


class PaymentUtility:

    def __init__(self):
        self.payment_service = PaymentService()
        self.session_maker = get_session

    def realization_payment_by_user_id(
            self,
            payment: PaymentCreate,
            user_id: int,
    ) -> Tuple[Optional[PaymentCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.payment_service.insert_realization_payment_by_user_id(
                    user_id=user_id,
                    payment=payment,
                    db=session
                )

                session.expunge(results)

                return results, msg

        except Exception as e:
            raise ConnectionError(e)

    def get_all_payments_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[PaymentCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.payment_service.select_payments_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            raise ConnectionError(e)
