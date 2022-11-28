from typing import Optional, Tuple, Union

from api.database.connection import get_session
from api.schemas.user_schema import UserCreate, User, UserBase, UserLogin
from api.services.address_service import AddressService
from api.services.contacts_service import ContactService
from api.services.creditcard_service import CreditCardService
from api.services.identification_service import IdentificationService
from api.services.test_service import TestsService
from api.services.users_service import UsersService


class UsersUtility:

    def __init__(self):
        self.users = UsersService()
        self.address = AddressService()
        self.creditcard = CreditCardService()
        self.contacts = ContactService()
        self.identification = IdentificationService()
        self.tests = TestsService()
        self.session_maker = get_session

    def create_user_email(
            self,
            user: UserCreate
    ) -> Tuple[Optional[UserCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.users.get_user_by_email(
                    email=user.UserEmail,
                    db=session
                )

                if results:
                    return None, 'Este Email Consta Na Nossa Base De Usuários. Cadastre-Se Com Outro Email'

                results, msg = self.users.create_user(
                    user=user,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge(results)

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_user(
            self,
            user_id: int
    ) -> Tuple[Optional[User], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.users.get_user_id(
                    user_id=user_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def user_authenticate(
            self,
            user: UserLogin
    ) -> Tuple[Optional[User], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.users.get_user_for_auth(
                    user=user,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def get_all_users(
            self,
    ) -> Tuple[Optional[UserBase], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.users.get_users(
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e.detail)

    def get_all_info_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[Union[dict, str]], str]:

        try:
            with self.session_maker() as session:

                # results, msg = self.users.select_user_all_info_by_user_id(
                #     user_id=user_id,
                #     db=session
                # )

                tests, msg = self.tests.select_tests_by_user_id(user_id=user_id, db=session)
                identification, msg = self.identification.select_identification_by_user_id(user_id=user_id, db=session)
                contacts, msg = self.contacts.select_contact_by_user_id(user_id=user_id, db=session)
                creditcard, msg = self.creditcard.select_creditcard_by_user_id(user_id=user_id, db=session)
                address, msg = self.address.select_address_by_user_id(user_id=user_id, db=session)

                if not identification and (not contacts) and (not address) and (not creditcard):
                    session.rollback()
                    return None, 'Você Ainda Não Preencheu Nada...'

                session.expunge_all()

                return {
                           'Identification': identification,
                           'Contacts': contacts,
                           'Address': address,
                           'CreditCard': creditcard,
                           'Tests': tests,
                       }, msg

        except Exception as e:
            return None, str(e.detail)
