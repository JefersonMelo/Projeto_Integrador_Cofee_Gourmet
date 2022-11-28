from typing import Optional, Tuple

from api.database.connection import get_session
from api.schemas.payment_schema import PaymentCreate
from api.services.payment_service import PaymentService
from api.services.shop_service import CarShopService


class PaymentUtility:

    def __init__(self):
        self.payment_service = PaymentService()
        self.car_service = CarShopService()
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
            return None, str(e.detail)

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
            return None, str(e.detail)

    def execute_calc_payments_by_user_id(
            self,
            user_id: int
    ):

        try:
            with self.session_maker() as session:

                results, msg = self.car_service.select_user_items(
                    user_id=user_id,
                    db=session
                )

                if not results:
                    return None, msg

                sum_no_discount = 0.0
                sum_discount = 0.0
                total = 0.0

                for i, product in enumerate(results):
                    price = float(product.Products.Price)
                    p_discount = float(product.Products.DiscountPrice)
                    total = (total + price)
                    if p_discount > 0:
                        sum_discount = (sum_discount + p_discount)
                    else:
                        sum_no_discount = (sum_no_discount + price)

                total_payment = (sum_discount + sum_no_discount)

                session.expunge_all()

                return {'Qtd': len(results),
                        'CarValue': total,
                        'CarWithDiscount': total_payment
                        }, msg

        except Exception as e:
            return None, str(e.detail)
