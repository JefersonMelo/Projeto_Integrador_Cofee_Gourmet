from typing import Optional, Tuple
from sqlalchemy.orm import Session
from api.models.schemas import UserCreate, UserLogin
from api.database.models import DbUser


class UsersService:

    @classmethod
    def create_user(
            cls,
            user: UserCreate,
            db: Session
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = DbUser(
                email=user.email,
                password=user.password,
                name=user.name
            )

            if not results:
                db.rollback()
                return None, 'Error'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'User Created with Success'

        except Exception as e:
            return None, str(e)

    @classmethod
    def get_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = db.query(DbUser).filter(DbUser.id == user_id).first()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e)

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
                DbUser.email == user.email,
                DbUser.password == user.password
            ).first()

            if not results:
                return None, 'Triste, Mas Você Não Te Achei!'

            return results, f'{results.name}, Valeu Por Estar Aqui!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def get_user_by_email(
            cls,
            db: Session,
            email: str,
    ) -> Tuple[Optional[DbUser], str]:

        try:

            results = db.query(DbUser).filter(DbUser.email == email).first()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e)

    @classmethod
    def get_users(
            cls,
            db: Session,
            skip: int,
            limit: int
    ):

        try:

            results = db.query(DbUser).offset(skip).limit(limit).all()

            if not results:
                return None, 'Error'

            return results, 'Success'

        except Exception as e:
            return None, str(e)
