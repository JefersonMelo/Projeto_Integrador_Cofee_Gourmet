from typing import Optional

from fastapi import APIRouter
from fastapi import HTTPException

from ..schemas.test_schema import TestCreate
from ..utilities.test_utility import TestUtility

router = APIRouter()


@router.post('/add/new/test')
async def post_new_test(test: Optional[TestCreate] = None):
    
    try:
        test_utility = TestUtility()

        results, msg = test_utility.add_new_test(
            test=test
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/tests/user/id/{user_id}')
async def get_all_tests_by_user_id(user_id: int):
    
    try:
        test_utility = TestUtility()

        results, msg = test_utility.get_tests_by_user_id(user_id=user_id)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
