from typing import Optional

from fastapi import APIRouter
from fastapi import HTTPException

from ..schemas.category_schema import Category
from ..utilities.category_utility import CategoryUtility

router = APIRouter()


@router.post('/new/category')
async def add_new_category(category: Optional[Category]):
    try:
        cat_utility = CategoryUtility()

        results, msg = cat_utility.create_new_category(category)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/all/categories')
def get_all_categories():
    try:
        cat_utility = CategoryUtility()

        results, msg = cat_utility.get_all_categories()

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)


@router.get('/get/category/{category_id}')
def get_all_categories(category_id: int):
    try:
        cat_utility = CategoryUtility()

        results, msg = cat_utility.get_category_by_id(category_id=category_id)

        if not results:
            raise HTTPException(status_code=400, detail=msg)

        return {'results': results, 'detail': msg}

    except Exception as e:
        msg = str(e)
        raise HTTPException(status_code=400, detail=msg)
