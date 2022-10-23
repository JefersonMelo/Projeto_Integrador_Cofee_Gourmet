from typing import Optional
from fastapi import HTTPException

from ..schemas.car_shop_schema import NewItemCarShop, RemoveItemCarShop
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

        return {'results': results, 'detail': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/car/shop/{user_id}')
def get_car_shop_by_user_id(user_id: int):
    try:
        shop_utility = CarShopUtility()

        results, msg = shop_utility.get_all_items_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.delete('/del/item/car/shop')
def delete_item_car_by_ids(del_item: Optional[RemoveItemCarShop]):
    msg = None
    try:
        shop_utility = CarShopUtility()

        results, msg = shop_utility.delete_item_car_shop(del_item=del_item)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=msg)
