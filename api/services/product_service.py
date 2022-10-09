from typing import Optional, Tuple, List
from sqlalchemy.orm import Session, joinedload
from api.schemas.product_schema import CreateProduct
from api.database.models import DbProduct


class ProductService:

    @classmethod
    def insert_new_product(
            cls,
            product: CreateProduct,
            db: Session
    ) -> Tuple[Optional[DbProduct], str]:

        try:

            results = DbProduct(**product.dict())

            if not results:
                db.rollback()
                return None, 'Erro Ao Criar Produto.'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Produto Criado Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_all_products(
            cls,
            db: Session,
            skip: int,
            limit: int
    ) -> Tuple[List[Optional[DbProduct]], str]:

        try:

            results = db.query(DbProduct).offset(skip).limit(limit).all()

            if not results:
                return [], 'Erro ao Carregar Produtos.'

            return results, 'Produtos Carregados ComSucesso!'

        except Exception as e:
            return [], str(e)

    @classmethod
    def select_product_and_categories_by_product_id(
            cls,
            db: Session,
            product_id: int
    ) -> Tuple[Optional[Tuple[DbProduct]], str]:
        try:

            results = db.query(
                DbProduct
            ).filter(
                DbProduct.ProductID == product_id
            ).options(
                joinedload(DbProduct.Category)
            ).first()

            if not results:
                return None, 'Produto Não Localizado.'

            return results, 'Produto Localiazado Com Sucesso!'

        except Exception as e:
            return None, str(e)
