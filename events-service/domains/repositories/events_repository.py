from sqlalchemy.orm import Session
from domains.models.events import Events
from domains.models.user import User
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import * 
from uuid import UUID

class EventsRepository:
    session: Session

    def __init__(self, db_session: Session):
        self.session = db_session

    """
    Adds new Events object to be persisted using Event object

    :param new_event: Event representing event to be added
    :return: Event of added event
    """
    def _add_event(self, new_event: Events):
        self.session.add(new_event)
        self.session.commit()
        return new_event

    """
    Adds new Event object to be persisted using event field parameters

    :param event_id: uuid of event_uuid
    :return: Event of added event
    """
    @check_id_exists(User, ["owner", "moderators", "users"])
    def add_event(self, title, description, owner, moderators, users):
        owner = self.session.get(User, owner)
        new_event = Events(title=title, description=description, owner=owner,
                           moderators=[],
                           users=[])
        return self._add_event(new_event)

    """
    Get Event object

    :param event_id: uuid of event_uuid
    :return: Event of event
    """
    @check_id_exists(Events, ["event_id"])
    def get_event(self, event_id):
        event = self.session.get(Events, event_id)
        return event
