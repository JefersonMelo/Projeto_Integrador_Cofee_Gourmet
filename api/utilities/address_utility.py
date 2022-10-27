from typing import Optional, Tuple
from api.database.connection import get_session
from api.schemas.address_schema import AddressCreate
from api.schemas.user_schema import UserCreate, User, UserBase, UserLogin
from api.services.address_service import AddressService
from api.services.users_service import UsersService


class AddressUtility:

    def __init__(self):
        self.address_service = AddressService()
        self.session_maker = get_session

    def create_address_by_user_id(
            self,
            address: AddressCreate,
            user_id: int,
    ) -> Tuple[Optional[AddressCreate], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.address_service.insert_address_by_user_id(
                    user_id=user_id,
                    address=address,
                    db=session
                )

                session.expunge(results)

                return results, msg

        except Exception as e:
            raise ConnectionError(e)

    def get_address_by_user_id(
            self,
            user_id: int
    ) -> Tuple[Optional[User], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.address_service.select_address_by_user_id(
                    user_id=user_id,
                    db=session
                )

                session.expunge_all()

                return results, msg

        except Exception as e:
            raise ConnectionError(e)
