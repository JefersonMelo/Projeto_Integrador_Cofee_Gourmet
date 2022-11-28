from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from api.schemas.test_schema import TestCreate
from api.database.models import DbTest


class TestsService:

    @classmethod
    def insert_new_test(
            cls,
            test: TestCreate,
            db: Session
    ) -> Tuple[Optional[DbTest], str]:

        try:

            results = DbTest(**test.dict())

            if not results:
                db.rollback()
                return None, 'Erro ao Adicionar Teste'

            db.add(results)

            db.commit()

            db.refresh(results)

            return results, 'Valeu Por Realizar Este Teste! S2'

        except Exception as e:
            return None, str(e.detail)

    @classmethod
    def select_tests_by_user_id(
            cls,
            db: Session,
            user_id: int,
    ) -> Tuple[Optional[List[DbTest]], str]:

        try:

            results = db.query(DbTest).filter(DbTest.FK_UserID == user_id).all()

            if not results:
                return None, 'Não Consegui Localizar Seus Testes'

            return results, 'Localizei Seus Testes. Valeu!'

        except Exception as e:
            return None, str(e.detail)
