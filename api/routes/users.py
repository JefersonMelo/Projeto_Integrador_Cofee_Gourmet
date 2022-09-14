from typing import Optional
from fastapi import HTTPException

from ..utilities.users_utility import UsersUtility
from ..models.schemas import UserCreate, UserLogin
from fastapi import APIRouter

router = APIRouter()


@router.post('/create/user/')
async def create_user(user: Optional[UserCreate] = None):
    msg = None
    try:
        users = UsersUtility()

        results, msg = users.create_user_email(
            password=user.password,
            email=user.email
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'message': msg}

    except Exception:
        raise HTTPException(status_code=400, detail=msg)


@router.get('/all/users/')
async def get_all_users():
    try:
        users = UsersUtility()

        results, msg = users.get_all_users(skip=0, limit=100)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'message': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/user/id/{user_id}')
async def get_user(user_id: int):
    try:
        users = UsersUtility()

        results, msg = users.get_user(user_id=user_id)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'message': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.post('/login')
async def user_login(user: Optional[UserLogin] = None):
    try:
        users = UsersUtility()

        results, msg = users.user_authenticate(user=user)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'id': results.id, 'token': '@coffee-token', 'msg': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# @router.get('/user/email/{user_email}')
# async def get_user_by_email(user_email: str):
#     try:
#         users = UsersUtility()
#
#         results, msg = users.get_user_by_email(email=user_email)
#
#         if not results:
#             raise HTTPException(status_code=400, detail=msg)
#
#         return {'detail': results, 'msg': msg}
#
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
