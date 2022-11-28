from typing import Optional, Tuple, List

from sqlalchemy.orm import Session

from api.database.models import DbProductSubtype
from api.schemas.prod_subtype_schema import ProductSubtype


class ProductSubtypeService:

    @classmethod
    def insert_new_product_subtype(
            cls,
            prod_subtype: ProductSubtype,
            db: Session
    ) -> Tuple[Optional[DbProductSubtype], str]:

        try:

            results = DbProductSubtype(**prod_subtype.dict())

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
    ) -> Tuple[List[Optional[DbProductSubtype]], str]:

        try:

            results = db.query(DbProductSubtype).all()

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
    ) -> Tuple[Optional[Tuple[DbProductSubtype]], str]:

        try:

            results = db.query(
                DbProductSubtype
            ).filter(
                DbProductSubtype.ProductSubtypeID == subtype_id,
                DbProductSubtype.Deleted.is_(None)
            ).first()

            if not results:
                return None, 'Subtipos Não Localizado'

            return results, 'Subtipos Localizados com Sucesso!'

        except Exception as e:
            return None, str(e)
