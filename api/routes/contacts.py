from typing import Optional
from fastapi import HTTPException

from ..schemas.contacts_schema import ContactsCreate, ContactsModified
from ..utilities.contacts_utility import ContactsUtility
from fastapi import APIRouter

router = APIRouter()


@router.post('/add/new/contact/user/{user_id}')
async def post_new_contact_by_user_id(user_id: int, contact: Optional[ContactsCreate] = None):
    try:
        contacts_utility = ContactsUtility()

        results, msg = contacts_utility.create_contact_by_user_id(
            user_id=user_id,
            contact=contact
        )

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.get('/get/contacts/user/{user_id}')
async def get_contacts_by_user(user_id: int):
    try:
        contacts_utility = ContactsUtility()

        results, msg = contacts_utility.get_contact_by_user_id(user_id=user_id)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)


@router.put('/edit/contacts/user/{user_id}')
async def put_contacts_by_user(user_id: int, contact: Optional[ContactsModified] = None):
    try:
        contacts_utility = ContactsUtility()

        results, msg = contacts_utility.edit_contact_by_user_id(
            user_id=user_id,
            contact=contact)

        return {'results': results, 'detail': msg}

    except Exception as e:
        raise HTTPException(status_code=400, detail=e.detail)
