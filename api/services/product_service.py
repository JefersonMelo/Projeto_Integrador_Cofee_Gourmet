from typing import Optional, Tuple, List

from sqlalchemy.orm import Session, joinedload

from api.database.models import DbProduct, DbProvider
from api.schemas.product_schema import CreateProduct, ProductSelect


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

            results = db.query(
                DbProduct
            ).join(
                DbProvider
            ).filter(
                DbProduct.FK_ProviderID == DbProvider.ProviderID
            ).options(
                joinedload(DbProduct.Provider)
            ).offset(skip).limit(limit).all()

            if not results:
                return [], 'Erro ao Carregar Produtos.'

            return results, 'Produtos Carregados ComSucesso!'

        except Exception as e:
            return None, str(e.detail)

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
            return None, str(e.detail)

    @classmethod
    def select_products_by_ids(
            cls,
            db: Session,
            fks: ProductSelect
    ):
        try:

            results = db.query(
                DbProduct
            ).join(
                DbProvider
            ).filter(
                DbProduct.FK_ProviderID == DbProvider.ProviderID
            ).filter(
                DbProduct.FK_CategoryID == fks.FK_CategoryID,
                DbProduct.FK_ProductTypeID == fks.FK_ProductTypeID,
                DbProduct.FK_ProductSubtypeID == fks.FK_ProductSubtypeID
            ).options(
                joinedload(DbProduct.Provider)
            ).all()

            if not results:
                return None, 'Produto Não Localizado.'

            return results, 'Produto Localiazado Com Sucesso!'

        except Exception as e:
            return None, str(e.detail)