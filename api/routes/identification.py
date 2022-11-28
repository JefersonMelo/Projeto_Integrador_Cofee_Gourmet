from typing import Optional

from fastapi import APIRouter
from fastapi import HTTPException

from ..schemas.identification_schema import Identification, IdentificationModified
from ..utilities.identification_utility import IdentificationUtility

router = APIRouter()


@router.post('/add/new/identification/user/{user_id}')
async def added_new_identification(user_id: int, identification: Optional[Identification] = None):
    try:
        identification_utility = IdentificationUtility()

        results, msg = identification_utility.added_new_identification(
            user_id=user_id,
            identification=identification
        )

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/identification/user/{user_id}')
async def get_identification_by_user(user_id: int):
    try:
        identification_utility = IdentificationUtility()

        results, msg = identification_utility.get_identification_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.put('/edit/identification/user/{user_id}')
async def put_identification_by_user(user_id: int, identification: Optional[IdentificationModified] = None):
    try:
        identification_utility = IdentificationUtility()

        results, msg = identification_utility.edit_identification_by_user_id(
            user_id=user_id,
            identification=identification
        )

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
