from typing import Optional, Tuple
from sqlalchemy.orm import Session

from api.schemas.address_schema import AddressCreate
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
            raise ConnectionError(e)

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
                raise ConnectionError('Endereço Não Localizado')

            return results, 'Endereço Localizado Com Sucesso!'

        except Exception as e:
            raise ConnectionError(e)
