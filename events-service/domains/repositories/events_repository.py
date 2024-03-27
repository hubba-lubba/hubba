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
    @check_id_exists(User, ["owner"])
    def add_event(self, title=None, thumbnail=None, description=None,
                  url=None, platform=None, tags=None, time_of_event=None,
                  host=None, entry_fee=None, owner=None):
        owner = self.session.get(User, owner)

        new_event = Events(title=title,
                           thumbnail=thumbnail,
                           description=description,
                           url=url,
                           platform=platform,
                           tags=tags,
                           time_of_event=time_of_event,
                           host=host,
                           entry_fee=entry_fee,
                           owner=owner,
                           moderators=[owner],
                           users=[owner])

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

    """
    Delete Event object
    :param event_id: uuid of event_uuid
    :return: uuid of deleted event
    """
    @check_id_exists(Events, ["event_id"])
    def delete_event(self, event_id):
        event = self.get_event(event_id)
        self.session.delete(event)
        self.session.commit()
        return event_id
