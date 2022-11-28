from typing import Optional, Tuple, List

from sqlalchemy.orm import Session, joinedload

from api.database.models import DbUser, DbContact, DbAddress, DbIdentification, DbCreditCard
from api.schemas.user_schema import UserCreate, UserLogin


class UsersService:

    @classmethod
    def create_user(
            cls,
            user: UserCreate,
            db: Session
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = DbUser(**user.dict())

            if not results:
                db.rollback()
                return None, 'Error'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'User Created with Success'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def get_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = db.query(DbUser).filter(DbUser.UserID == user_id).first()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def get_user_for_auth(
            cls,
            db: Session,
            user: UserLogin,
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = db.query(
                DbUser
            ).filter(
                DbUser.UserEmail == user.UserEmail,
                DbUser.Password == user.Password
            ).first()

            if not results:
                return None, 'Triste, Mas Você Não Te Achei!'

            return results, f'{results.UserName}, Valeu Por Estar Aqui!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def get_user_by_email(
            cls,
            db: Session,
            email: str,
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = db.query(DbUser).filter(DbUser.UserEmail == email).first()

            if not results:
                return None, 'Usuário Não Localizado'

            return results, 'Usuário Localizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def get_users(
            cls,
            db: Session,
    ):

        try:

            results = db.query(DbUser).all()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def select_user_all_info_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[List[DbUser]], str]:

        try:

            results = db.query(
                DbUser
            ).join(
                DbContact
            ).join(
                DbAddress
            ).join(
                DbCreditCard
            ).join(
                DbIdentification
            ).filter(
                DbUser.UserID == user_id
            ).options(
                joinedload(DbUser.Address),
                joinedload(DbUser.Contacts),
                joinedload(DbUser.CreditCard),
                joinedload(DbUser.Identification),
            ).first()

            if not results:
                return None, 'Solicitação Não Localizada'

            return results, 'Informações Localizadas com Sucesso!'

        except Exception as e:
            return None, str(e.detail)
