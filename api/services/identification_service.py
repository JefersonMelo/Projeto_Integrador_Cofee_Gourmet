from typing import Optional, Tuple, List
from sqlalchemy.orm import Session, joinedload
from api.database.models import DbUser, DbIdentification
from api.schemas.identification_schema import Identification


class IdentificationService:

    @classmethod
    def insert_new_identification(
            cls,
            identification: Identification,
            db: Session
    ) -> Tuple[Optional[DbIdentification], str]:

        try:

            results = DbIdentification(**identification.dict())

            if not results:
                db.rollback()
                raise ConnectionError('Erro ao Cadastrar Novo Documento')

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Documento Cadastrado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(str(e))

    @classmethod
    def select_identification_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[List[DbIdentification]], str]:

        try:

            results = db.query(
                DbUser
            ).join(
                DbIdentification
            ).filter(
                DbIdentification.FK_UserID == user_id,
                DbUser.UserID == user_id
            ).options(
                joinedload(DbUser.Identification)
            ).all()

            if not results:
                db.rollback()
                return None, 'Não Há Documento Resgitrado'

            return results, 'Documento Localizado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(e)
