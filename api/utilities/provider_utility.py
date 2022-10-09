from typing import Optional, Tuple, List
from api.database.connection import get_session
from api.schemas.provider_schema import Provider
from api.services.provider_service import ProviderService


class ProviderUtility:

    def __init__(self):
        self.provider_service = ProviderService()
        self.session_maker = get_session

    def create_new_provider(
            self,
            provider: Provider
    ) -> Tuple[Optional[Provider], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.provider_service.insert_new_provider(
                    provider=provider,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_all_providers(
            self,
            skip: int,
            limit: int
    ) -> Tuple[Optional[List[Provider]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.provider_service.select_all_providers(
                    db=session,
                    skip=skip,
                    limit=limit
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)

    def get_provider_by_id(
            self,
            provider_id: int
    ) -> Tuple[Optional[List[Provider]], str]:

        try:
            with self.session_maker() as session:

                results, msg = self.provider_service.select_provider_and_products_by_provider_id(
                    provider_id=provider_id,
                    db=session
                )

                if not results:
                    session.rollback()
                    return None, msg

                session.expunge_all()

                return results, msg

        except Exception as e:
            return None, str(e)
