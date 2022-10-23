from typing import Optional
from fastapi import HTTPException

from ..utilities.product_utility import ProductUtility
from ..schemas.product_schema import CreateProduct
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/product')
async def create_new_product(product: Optional[CreateProduct]):
    msg = None
    try:
        product_utility = ProductUtility()

        results, msg = product_utility.create_product(product=product)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/all/products')
def get_all_products():
    msg = None
    try:
        prod_utility = ProductUtility()

        results, msg = prod_utility.get_products(skip=0, limit=100)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/product/{product_id}')
def get_product_by_product_id(product_id: int):
    msg = None
    try:
        prod_utility = ProductUtility()

        results, msg = prod_utility.get_product_and_categories(
            product_id=product_id
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=400, detail=msg)

