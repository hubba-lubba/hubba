from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.user import User
    from domains.models.events import Events
else:
    User = "User"
    Events = "Events"
from domains.models.base import Base
from sqlalchemy import ForeignKey, Table, Column, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY
import uuid

organization_moderator_table = Table("organization_moderator_table",
                                     Base.metadata,
                                     Column("organization", 
                                            UUID, 
                                            ForeignKey("organizations.organization_id"), 
                                            primary_key=True),
                                     Column("moderator", 
                                            UUID, 
                                            ForeignKey("users.user_id"), 
                                            primary_key=True))

user_table = Table("user_table",
                   Base.metadata,
                   Column("event", 
                          UUID, 
                          ForeignKey("events.event_id"), 
                          primary_key=True),
                   Column("user", 
                          UUID, 
                          ForeignKey("users.user_id"), 
                          primary_key=True))

tag_table = Table("tag_table",
                  Base.metadata,
                  Column("event", 
                         UUID, 
                         ForeignKey("events.event_id"), 
                         primary_key=True),
                  Column("tag", 
                         String(32), 
                         primary_key=True))


class Organizations(Base):
    __tablename__ = "organizations"

    organization_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                         primary_key=True,
                                         default=uuid.uuid4)
                            
    name: Mapped[str] = mapped_column(String(32))

    image: Mapped[str] = mapped_column(String(128), 
                                       nullable=True)

    description: Mapped[str] = mapped_column(String(128), 
                                             nullable=True)

    owner_id: Mapped[UUID] = mapped_column(ForeignKey("users.user_id"))

    owner: Mapped[User] = relationship(back_populates="owns")

    moderators: Mapped[list[User]] = relationship(secondary=event_moderator_table,
                                                    back_populates="moderates")

    users: Mapped[list[User]] = relationship(secondary=user_table)

    events: Mapped[list[Events]] = relationship(secondary=events_table)

    def get_JSON(self):
        return Events.to_JSON(self)

    @staticmethod
    def to_JSON(user):
        return {
            "event_id": user.event_id,
            "owner_id": user.owner_id,
            "title": user.title,
            "thumbnail": user.thumbnail,
            "description": user.description,
            "url": user.url,
            "platform": user.platform,
            "tags": user.tags,
            "time_of_event": user.time_of_event.utcnow() if user.time_of_event else None,
            "host": user.host,
            "entry_fee": user.entry_fee,
            "date_posted": user.date_posted.utcnow() if user.date_posted else None,
        }
