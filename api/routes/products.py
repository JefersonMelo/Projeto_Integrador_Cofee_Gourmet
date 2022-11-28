from typing import Optional
from fastapi import HTTPException

from ..utilities.product_utility import ProductUtility
from ..schemas.product_schema import CreateProduct, ProductSelect
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/product')
async def create_new_product(product: Optional[CreateProduct]):
    
    try:
        product_utility = ProductUtility()

        results, msg = product_utility.create_product(product=product)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/')
@router.get('/home')
@router.get('/get/all/products')
def get_all_products():
    
    try:
        prod_utility = ProductUtility()

        results, msg = prod_utility.get_products(skip=0, limit=100)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/product/{product_id}')
def get_product_by_product_id(product_id: int):
    
    try:
        prod_utility = ProductUtility()

        results, msg = prod_utility.get_product_and_categories(
            product_id=product_id
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.post('/get/products')
def get_product_by_ids(fks: ProductSelect):
    try:
        prod_utility = ProductUtility()

        results, msg = prod_utility.get_products_by_ids(
            fks=fks
        )

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
