from typing import Optional, Tuple

from sqlalchemy import update
from sqlalchemy.engine import Result
from sqlalchemy.orm import Session

from api.schemas.address_schema import AddressCreate, AddressModified
from api.database.models import DbAddress


class AddressService:

    @classmethod
    def insert_address_by_user_id(
            cls,
            address: AddressCreate,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[DbAddress], str]:

        try:

            results = DbAddress(**address.dict())

            if not results:
                db.rollback()
                raise ConnectionError('Erro Ao Salvar Endereço')

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Endereço Salvo Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def select_address_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[DbAddress], str]:

        try:

            results = db.query(DbAddress).filter(DbAddress.FK_UserID == user_id).first()

            if not results:
                db.rollback()
                return None, 'Não Há Endereço Cadastrado'

            return results, 'Endereço Localizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def update_address_by_user_id(
            cls,
            address: AddressModified,
            user_id: int,
            db: Session
    ) -> Tuple[Optional[Result], str]:

        try:

            results = db.execute(
                update(DbAddress)
                .where(DbAddress.FK_UserID == user_id)
                .values(**address.dict()))

            if not results:
                db.rollback()
                return None, 'Erro ao Atualizar. Tente Novamente Mais Tarde!'

            return results, 'Atualizado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)
