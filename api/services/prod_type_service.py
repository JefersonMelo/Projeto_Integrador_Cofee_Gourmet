from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from api.schemas.prod_type_schema import ProductType
from api.database.models import DbProductType


class ProductTypeService:

    @classmethod
    def insert_new_product_type(
            cls,
            product_type: ProductType,
            db: Session
    ) -> Tuple[Optional[DbProductType], str]:

        try:

            results = DbProductType(**product_type.dict())

            if not results:
                db.rollback()
                return None, 'Erro ao Salvar!'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Salvo com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def get_product_type(
            cls,
            db: Session,
    ) -> Tuple[Optional[List[DbProductType]], str]:

        try:

            results = db.query(DbProductType).all()

            if not results:
                return None, 'Erro ao Recuperar Tipos'

            return results, 'Tipos Recuperados com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_product_type_by_id(
            cls,
            product_type_id: int,
            db: Session,
    ) -> Tuple[Optional[List[DbProductType]], str]:

        try:

            results = db.query(
                DbProductType
            ).filter(
                DbProductType.ProductTypeID == product_type_id
            ).first()

            if not results:
                return None, 'Erro ao Recuperar Tipos'

            return results, 'Tipos Recuperados com Sucesso!'

        except Exception as e:
            return None, str(e)
