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
            user=user
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'message': msg}

    except Exception:
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

        return {'id': results.id, 'userName': results.name, 'token': '@coffee-token', 'msg': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
