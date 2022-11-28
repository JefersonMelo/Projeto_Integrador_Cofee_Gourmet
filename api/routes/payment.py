from typing import Optional
from fastapi import HTTPException

from fastapi import APIRouter

from api.schemas.payment_schema import PaymentCreate
from api.utilities.payment_utility import PaymentUtility

router = APIRouter()


@router.post('/payment/user/{user_id}')
async def post_realization_new_payment(user_id: int, payment: Optional[PaymentCreate] = None):

    try:
        payment_utility = PaymentUtility()

        results, msg = payment_utility.realization_payment_by_user_id(
            user_id=user_id,
            payment=payment
        )

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/payments/user/{user_id}')
async def get_payments_by_user(user_id: int):
    try:
        payment_utility = PaymentUtility()

        results, msg = payment_utility.get_all_payments_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/calc/payment/user/{user_id}')
def get_car_shop_by_user_id(user_id: int):
    try:
        payment_utility = PaymentUtility()

        results, msg = payment_utility.execute_calc_payments_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
