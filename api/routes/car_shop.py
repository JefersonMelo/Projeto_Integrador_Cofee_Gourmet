from typing import Optional
from fastapi import HTTPException

from ..schemas.car_shop_schema import NewItemCarShop
from ..utilities.prod_type_utility import TypeUtility
from fastapi import APIRouter

from ..utilities.shop_utility import CarShopUtility

router = APIRouter()


@router.post('/add/new/product/in/car/shop')
async def add_new_product_in_car_shop(new_item: Optional[NewItemCarShop]):
    try:
        shop_utility = CarShopUtility()

        results, msg = shop_utility.add_new_item_in_car_shop_by_user_id(new_item=new_item)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/all/product/types')
def get_all_types():
    try:
        type_utility = TypeUtility()

        results, msg = type_utility.get_all_product_types()

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/product/type/{product_type_id}')
def get_all_types(product_type_id: int):
    try:
        type_utility = TypeUtility()

        results, msg = type_utility.get_product_type_by_id(product_type_id=product_type_id)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'detail': results, 'msg': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)
