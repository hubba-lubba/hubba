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
    Arguments: uid: str id of new userm, username: str of new user
    Returns: User: User of added user data
    """
    @check_id_not_exists(["uid", "username"])
    def add_user(self, uid, username):
        new_user = User(uid=uid, username=username)
        return self._add_user(new_user)

    """
    Description: Gets an existing User
    Arguments: uid: str id of User
    Returns: User: user obtained from persisted data
    """
    @check_id_exists(["uid"])
    def get_user(self, uid):
        user = self.session.get(User, uid)
        return user

    """
    Description: Edits biography of user
    Arguments: id: uuid of user with biography to be edited
    Returns: User: User with modified biography
    """
    @check_id_exists(["uid"])
    def edit_biography(self, uid, biography):
        user = self.session.get(User, uid)
        user.biography = biography
        self.session.commit()
        return user
