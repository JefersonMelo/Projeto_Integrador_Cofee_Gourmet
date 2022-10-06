from typing import Optional
from fastapi import HTTPException

from ..utilities.product_utility import ProductUtility
from ..schemas.product_schema import CreateProduct
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/product')
async def create_new_product(product: Optional[CreateProduct]):
    try:
        product_utility = ProductUtility()

        results, msg = product_utility.create_product(product=product)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/')
def get_all_items():
    try:
        items = ProductUtility()

        results, msg = items.get_all_items(skip=0, limit=100)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)
