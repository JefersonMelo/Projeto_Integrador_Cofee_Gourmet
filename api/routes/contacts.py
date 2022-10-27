from typing import Optional
from fastapi import HTTPException

from ..schemas.contacts_schema import ContactsCreate
from ..utilities.contacts_utility import ContactsUtility
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/contact/user/{user_id}')
async def create_new_contact(user_id: int, contact: Optional[ContactsCreate] = None):
    try:
        contacts_utility = ContactsUtility()

        results, msg = contacts_utility.create_contact_by_user_id(
            user_id=user_id,
            contact=contact
        )

        return {'userid': user_id, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e)


@router.get('/get/contacts/user/{user_id}')
async def get_contacts_by_user(user_id: int):

    try:
        contacts_utility = ContactsUtility()

        results, msg = contacts_utility.get_contact_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e)
