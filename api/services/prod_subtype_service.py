from typing import Optional, Tuple, List, Union
from sqlalchemy.orm import Session
from api.schemas.prod_subtype_schema import ProductSubtype
from api.database.models import DbProductSubType


class ProductSubtypeService:

    @classmethod
    def insert_new_product_subtype(
            cls,
            prod_subtype: ProductSubtype,
            db: Session
    ) -> Tuple[Optional[DbProductSubType], str]:

        try:

            results = DbProductSubType(**prod_subtype.dict())

            if not results:
                db.rollback()
                return None, 'Erro ao Cadastrar Subtipo'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Sucesso ao Cadastrar Subtipo'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_all_subtypes(
            cls,
            db: Session
    ) -> Tuple[List[Optional[DbProductSubType]], str]:

        try:

            results = db.query(DbProductSubType).all()

            if not results:
                return [], 'Subtipos Não Localizado'

            return results, 'Subtipos Localizados com Sucesso!'

        except Exception as e:
            return [], str(e)

    @classmethod
    def select_subtype_by_id(
            cls,
            subtype_id: int,
            db: Session
    ) -> Tuple[Optional[Tuple[DbProductSubType]], str]:

        try:

            results = db.query(
                DbProductSubType
            ).filter(
                DbProductSubType.ProductSubtypeID == subtype_id,
                DbProductSubType.Deleted.is_(None)
            ).first()

            if not results:
                return None, 'Subtipos Não Localizado'

            return results, 'Subtipos Localizados com Sucesso!'

        except Exception as e:
            return None, str(e)
