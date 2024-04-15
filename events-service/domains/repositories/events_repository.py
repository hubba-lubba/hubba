from sqlalchemy.orm import Session
from domains.models.events import Events
from domains.models.user import User
from domains.repositories.repo_exceptions import *
from domains.repositories.utils import * 
from uuid import UUID
from sqlalchemy.sql import func

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
    def get_event(self, event_id=None):
        event = self.session.get(Events, event_id)
        return event

    """
    Delete Event object
    :param event_id: uuid of event_uuid
    :return: uuid of deleted event
    """
    @check_id_exists(Events, ["event_id"])
    def delete_event(self, event_id=None):
        event = self.get_event(event_id)
        self.session.delete(event)
        self.session.commit()
        return event_id

    """
    Updates Event object using Event object

    :param event: Event of updated event
    :return: Event of updated event
    """
    def _update_event(self, event: Events):
        self.session.merge(event)
        self.session.commit()
        return event

    """
    Updates Event object to be persisted using event field parameters

    :param event_id: uuid of event_uuid
    :return: Event of updated event
    """
    @check_id_exists(Events, ["event_id"])
    def update_event(self, event_id, title=None, thumbnail=None, description=None,
                  url=None, platform=None, tags=None, time_of_event=None,
                  host=None, entry_fee=None):
        event = self.get_event(event_id)
        if not event:
            return

        event.title = title if title else event.title
        event.thumbnail = thumbnail if thumbnail else event.thumbnail
        event.description = description if description else event.description
        event.url = url if url else event.url
        event.platform = platform if platform else event.platform
        event.tags = tags if tags else event.tags
        event.time_of_event = time_of_event if time_of_event else event.time_of_event
        event.host = host if host else event.host
        event.entry_fee = entry_fee if entry_fee else event.entry_fee

        return self._update_event(event)

    @check_id_exists(Events, ["event_id"])
    @check_id_exists(User, ["user_id"])
    def add_user(self, event_id=None, user_id=None):
        event = self.get_event(event_id=event_id)
        user = self.session.get(User, user_id)
        if not event: return

        event.users = list(set(event.users + [user]))
        return self._update_event(event)

    @check_id_exists(Events, ["event_id"])
    @check_id_exists(User, ["user_id"])
    def delete_user(self, event_id=None, user_id=None):
        event = self.get_event(event_id=event_id)
        user = self.session.get(User, user_id)
        if not event: return

        event.users = list(set(event.users) - set([user]))
        return self._update_event(event)

    def get_random_events(self):
        return self.session.query(Events).order_by(func.random()).limit(5).all()

    def get_upcoming_events(self):
        return self.session.query(Events).order_by(Events.time_of_event).limit(5).all()

    def get_current_events(self):
        return self.session.query(Events).filter(Events.time_of_event > func.now()).order_by(Events.time_of_event).limit(5).all()
