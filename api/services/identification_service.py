from typing import Optional, Tuple, List

from sqlalchemy import update
from sqlalchemy.engine import Result
from sqlalchemy.orm import Session

from api.database.models import DbIdentification
from api.schemas.identification_schema import Identification, IdentificationModified


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
            return None, str(e.detail)

    @classmethod
    def select_identification_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[List[DbIdentification]], str]:

        try:

            results = db.query(
                DbIdentification
            ).filter(
                DbIdentification.FK_UserID == user_id,
            ).first()

            if not results:
                db.rollback()
                return None, 'Não Há Documento Resgitrado'

            return results, 'Documento Localizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def update_identification_by_user_id(
            cls,
            identification: IdentificationModified,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[Result], str]:

        try:

            results = db.execute(
                update(DbIdentification)
                .where(DbIdentification.FK_UserID == user_id)
                .values(**identification.dict()))

            if not results:
                db.rollback()
                return None, 'Erro ao Atualizar. Tente Novamente Mais Tarde!'

            return results, 'Atualizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)
