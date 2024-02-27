from sqlalchemy.orm import Session
from domains.models.user import User
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import *


class UserRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session

    """
    Adds new User object to be persisted using User object

    :param new_user: User representing user to be added
    :return: User of added user
    """
    def _add_user(self, new_user: User):
        self.session.add(new_user)
        self.session.commit()
        return new_user

    """
    Adds new User object to be persisted using User field parameters

    :param user_id: uuid of user_uuid
    :return: User of added user
    """
    @check_id_not_exists(User, ["user_id"])
    def add_user(self, *, user_id):
        new_user = User(user_id = user_id)
        return self._add_user(new_user)

    @check_id_exists(User, ["user_id"])
    def delete_user(self, *, user_id):
        user = self.session.get(User, user_id)
        self.session.delete(user)
        self.session.commit()
        return user
