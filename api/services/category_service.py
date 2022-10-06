from typing import Optional, Tuple, List
from sqlalchemy.orm import Session, joinedload
from api.schemas.category_schema import Category
from api.database.models import DbCategory, DbProductType


class CategoryService:

    @classmethod
    def insert_new_category(
            cls,
            category: Category,
            db: Session
    ) -> Tuple[Optional[DbCategory], str]:

        try:

            results = DbCategory(**category.dict())

            if not results:
                db.rollback()
                return None, 'Erro ao Cadastrar Nova Categoria'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Categoria Cadastrada Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_categories(
            cls,
            db: Session,
    ) -> Tuple[Optional[List[DbCategory]], str]:

        try:

            results = db.query(DbCategory).all()

            if not results:
                return None, 'Erro ao Buscar Categorias'

            return results, 'Categorias Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_categories_and_product_types(
            cls,
            db: Session,
    ) -> Tuple[Optional[List[DbCategory]], str]:

        try:

            results = db.query(
                DbCategory
            ).join(
                DbProductType
            ).options(
                joinedload(DbCategory.ProductsTypes)
            ).all()

            if not results:
                return None, 'Erro ao Buscar Categorias'

            return results, 'Categorias Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_category_by_id(
            cls,
            category_id: int,
            db: Session,
    ) -> Tuple[Optional[List[DbCategory]], str]:

        try:

            results = db.query(
                DbCategory
            ).filter(
                DbCategory.CategoryID == category_id
            ).first()

            if not results:
                return None, 'Erro ao Buscar Categorias'

            return results, 'Categorias Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_category_and_products_types_by_category_id(
            cls,
            category_id: int,
            db: Session,
    ) -> Tuple[Optional[List[DbCategory]], str]:

        try:

            results = db.query(
                DbCategory
            ).join(
                DbProductType
            ).filter(
                DbCategory.CategoryID == category_id,
            ).filter(
                DbProductType.FK_CategoryID == category_id
            ).options(
                joinedload(DbCategory.ProductsTypes)
            ).all()

            if not results:
                return None, 'Erro ao Buscar Categorias'

            return results, 'Categorias Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e)
