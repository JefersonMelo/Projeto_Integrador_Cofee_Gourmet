from datetime import datetime
from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.contacts_schema import ContactsCreate, ContactsModified
from api.schemas.user_schema import User, UserBase, UserLogin
from api.services.contacts_service import ContactService


class ContactsUtility:

    def __init__(self):
        self.contact_service = ContactService()
        self.session_maker = get_session

    def create_contact_by_user_id(
            self,
            user_id: int,
            contact: ContactsCreate
    ) -> Tuple[Optional[ContactsCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.contact_service.insert_contact_by_user_id(
                    user_id=user_id,
                    contact=contact,
                    db=session
                )

                session.expunge(results)

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def get_contact_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[ContactsCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.contact_service.select_contact_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def edit_contact_by_user_id(
            self,
            user_id: int,
            contact: ContactsModified
    ) -> Tuple[Optional[ContactsModified], str]:

        try:
            with self.session_maker() as session:

                contact.Modified = datetime.now()

                result, msg = self.contact_service.update_contact_by_user_id(
                    user_id=user_id,
                    contact=contact,
                    db=session
                )

                if not result:
                    raise ConnectionError(msg)

                results, _msg = self.contact_service.select_contact_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)
