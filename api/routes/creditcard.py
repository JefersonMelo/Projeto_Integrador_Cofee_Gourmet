from typing import Optional

from fastapi import APIRouter
from fastapi import HTTPException

from api.schemas.creditcard_schema import CreditCard, DeleteCreditCard, UpdateCreditCard
from api.utilities.crediticard_utility import CreditCardUtility

router = APIRouter()


@router.post('/add/creditcard/user/{user_id}')
async def post_new_creditcard_by_user_id(user_id: int, creditcard: Optional[CreditCard] = None):
    try:
        card_utility = CreditCardUtility()

        results, msg = card_utility.add_new_creditcard_by_user_id(
            user_id=user_id,
            creditcard=creditcard
        )

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/creditcard/user/{user_id}')
async def get_active_creditcard_by_user_id(user_id: int):
    try:
        card_utility = CreditCardUtility()

        results, msg = card_utility.get_creditcard_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
    
    
@router.delete('/del/creditcard/user/{user_id}')
def delete_creditcard_by_user_id(creditcard: Optional[DeleteCreditCard]):
    
    try:
        card_utility = CreditCardUtility()

        results, msg = card_utility.delete_creditcard(creditcard=creditcard)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.put('/edit/creditcard/user/{user_id}')
def put_creditcard_by_user_id(creditcard: Optional[UpdateCreditCard]):
    try:
        card_utility = CreditCardUtility()

        results, msg = card_utility.edit_creditcard(creditcard=creditcard)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)

