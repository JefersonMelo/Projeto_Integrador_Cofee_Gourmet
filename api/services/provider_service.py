from typing import Optional, Tuple, List

from sqlalchemy import and_
from sqlalchemy.orm import Session, joinedload

from api.database.models import DbProvider, DbProduct
from api.schemas.provider_schema import Provider


class ProviderService:

    @classmethod
    def insert_new_provider(
            cls,
            provider: Provider,
            db: Session
    ) -> Tuple[Optional[DbProvider], str]:

        try:

            results = DbProvider(**provider.dict())

            if not results:
                db.rollback()
                return None, 'Erro ao Cadastrar Novo Fornecedor'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Fornecedor Cadastrado Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_all_providers(
            cls,
            db: Session,
            skip: int,
            limit: int
    ) -> Tuple[Optional[List[DbProvider]], str]:

        try:

            results = db.query(DbProvider).offset(skip).limit(limit).all()

            if not results:
                return None, 'Erro ao Buscar fornecedores'

            return results, 'Fonecedores Localizados Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_all_providers_and_products(
            cls,
            db: Session,
    ) -> Tuple[Optional[List[DbProvider]], str]:

        try:

            results = db.query(
                DbProvider
            ).join(
                DbProduct
            ).options(
                joinedload(DbProvider.Products)
            ).all()

            if not results:
                return None, 'Erro ao Buscar Categorias'

            return results, 'Categorias Localizadas Com Sucesso!'

        except Exception as e:
            return None, str(e)

    @classmethod
    def select_provider_and_products_by_provider_id(
            cls,
            provider_id: int,
            db: Session,
    ) -> Tuple[Optional[List[DbProvider]], str]:

        try:

            results = db.query(
                DbProvider
            ).join(
                DbProduct
            ).filter(
                DbProvider.ProviderID == provider_id,
                and_(DbProduct.FK_ProviderID == provider_id)
            ).options(
                joinedload(DbProvider.Products)
            ).all()

            if not results:
                return None, 'Erro ao Buscar Fornecedor'

            return results, 'Fornecedor Localizado Com Sucesso!'

        except Exception as e:
            return None, str(e)
