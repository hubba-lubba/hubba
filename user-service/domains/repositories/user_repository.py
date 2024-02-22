from sqlalchemy.orm import Session
from domains.models.user import User
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import check_id_exists, check_id_not_exists
from events.publisher_factory import PublisherFactory
from logger import LoggerFactory


class UserRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session
        logger_factory = LoggerFactory()
        self.logger = logger_factory.get_logger()

        publisher_factory = PublisherFactory()
        self.publisher = publisher_factory.get_publisher()
        

    """
    Adds new User object to be persisted using User object

    :param new_user: User representing user to be added
    :return: User of added user
    """
    def _add_user(self, new_user: User):
        self.session.add(new_user)
        self.session.commit()
        self.publisher.publish(action=True, uuid=str(new_user.user_id))
        return new_user

    """
    Adds new User object to be persisted using User field parameters

    :param username: str of username
    :optional param user_id: str of uuid (must be able to be parsed to uuidv4)
    :optional param streaming_status: str of streaming status
    :return: User of added user
    """
    @check_id_not_exists(["username"])
    def add_user(self, username, user_id=None, streaming_status=None):
        new_user = User(username=username, user_id=user_id, streaming_status=streaming_status)
        return self._add_user(new_user)

    """
    Gets an existing User

    :param user_id: uuid of User
    :return: User object obtained from persisted data
    """
    @check_id_exists(["user_id"])
    def get_user(self, user_id):
        user = self.session.get(User, user_id)
        return user

    """
    Adds following users to existing user

    :param user_id: uuid of User
    :param new_following: list of uuid of new following users
    :return: User
    """
    @check_id_exists(["user_id", "following"])
    def add_following(self, user_id, following=[]):
        user = self.session.get(User, user_id)
        new_following = list(map(lambda user_id: self.session.get(User, user_id), following))

        if user is not None and user in new_following:
            raise SelfReferentialFollowException(user.user_id)

        user.following.extend(new_following)
        self.session.merge(user)
        self.session.commit()
        return user

