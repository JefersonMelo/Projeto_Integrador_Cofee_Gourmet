from typing import Optional
from fastapi import HTTPException

from ..utilities.prod_subtype_utility import ProductSubtypeUtility
from ..schemas.prod_subtype_schema import ProductSubtype
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/product/subtype')
async def create_new_product_subtype(prod_subtype: Optional[ProductSubtype]):
    try:
        subtype_utility = ProductSubtypeUtility()

        results, msg = subtype_utility.create_product_subtype(prod_subtype=prod_subtype)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/all/subtypes')
def get_all_subtypes():
    try:
        subtype_utility = ProductSubtypeUtility()

        results, msg = subtype_utility.get_subtypes()

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/subtype/{subtype_id}')
def get_all_subtype_by_id(subtype_id: int):
    try:
        subtype_utility = ProductSubtypeUtility()

        results, msg = subtype_utility.get_subtype_by_id(subtype_id=subtype_id)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)
