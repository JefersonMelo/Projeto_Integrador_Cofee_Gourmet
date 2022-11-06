from typing import Optional, Tuple

from sqlalchemy import update
from sqlalchemy.engine import Result
from sqlalchemy.orm import Session

from api.schemas.contacts_schema import ContactsCreate
from api.database.models import DbContact


class ContactService:

    @classmethod
    def insert_contact_by_user_id(
            cls,
            contact: ContactsCreate,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[DbContact], str]:

        try:

            results = DbContact(**contact.dict())

            if not results:
                db.rollback()
                raise ConnectionError('Erro Ao Salvar Contato. Tente Novamente Mais Tarde')

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Contato Adicionado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(e)

    @classmethod
    def select_contact_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[DbContact], str]:

        try:

            results = db.query(DbContact).filter(DbContact.FK_UserID == user_id).first()

            if not results:
                db.rollback()
                return None, 'Contato Não Localizado. Tente Novamente Mais Tarde'

            return results, 'Contato Localizado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(e)

    @classmethod
    def update_contact_by_user_id(
            cls,
            contact: ContactsCreate,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[Result], str]:

        try:

            results = db.execute(
                update(DbContact)
                .where(DbContact.FK_UserID == user_id)
                .values(**contact.dict()))

            if not results:
                db.rollback()
                return None, 'Erro ao Atualizar. Tente Novamente Mais Tarde!'

            return results, 'Atualizado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(e)
