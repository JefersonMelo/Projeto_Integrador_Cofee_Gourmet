from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter()


@router.get('/')
async def home():
    try:
        return {'results': 'connect'}
    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=404, detail=msg)
