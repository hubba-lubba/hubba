from sqlalchemy.orm import Session
from domains.models.user import User
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import check_id_exists, check_id_not_exists


class UserRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session

    """
    Description: Adds new User object to be persisted
    Arguments: new_user: User representing user to be added
    Returns: User: User of added user data
    """
    def _add_user(self, new_user: User):
        self.session.add(new_user)
        self.session.commit()
        return new_user

    """
    Description: Adds new User object to be persisted
    Arguments: username: str of new user
    Returns: User: User of added user data
    """
    @check_id_not_exists(["username"])
    def add_user(self, username):
        new_user = User(username=username)
        return self._add_user(new_user)

    """
    Description: Gets an existing User
    Arguments: uid: uuidv4 id of User
    Returns: User: user obtained from persisted data
    """
    @check_id_exists(["user_id"])
    def get_user(self, user_id):
        user = self.session.get(User, user_id)
        return user

