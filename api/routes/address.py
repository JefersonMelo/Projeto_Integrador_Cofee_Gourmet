from typing import Optional
from fastapi import HTTPException

from fastapi import APIRouter

from api.schemas.address_schema import AddressCreate
from api.utilities.address_utility import AddressUtility

router = APIRouter()


@router.post('/add/new/address/user/{user_id}')
async def create_new_address(user_id: int, address: Optional[AddressCreate] = None):

    try:
        address_utility = AddressUtility()

        results, msg = address_utility.create_address_by_user_id(
            user_id=user_id,
            address=address
        )

        return {'userid': user_id, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e)


@router.get('/get/address/user/{user_id}')
async def get_address_by_user(user_id: int):
    try:
        address_utility = AddressUtility()

        results, msg = address_utility.get_address_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e)
