from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.user import User
    from domains.models.organizations import Organizations
else:
    User = "User"
    Organizations = "Organizations"
from domains.models.base import Base
from sqlalchemy import ForeignKey, Table, Column, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY
import uuid


attendees_table = Table("attendees_table",
                   Base.metadata,
                   Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                   Column("attendee", String(32), ForeignKey("users.user_id"), primary_key=True))

tag_table = Table("tag_table",
                  Base.metadata,
                  Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                  Column("tag", String(32), primary_key=True))


class Events(Base):
    __tablename__ = "events"

    event_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                           primary_key=True,
                                           default=uuid.uuid4)

    title: Mapped[str] = mapped_column(String(32))

    thumbnail: Mapped[str] = mapped_column(String(128), nullable=True)

    description: Mapped[str] = mapped_column(String(128), nullable=True)

    url: Mapped[str] = mapped_column(String(128), nullable=True)

    platform: Mapped[str] = mapped_column(String(32), nullable=True)

    tags: Mapped[ARRAY] = mapped_column(ARRAY(String(32)))

    time_of: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True)

    host: Mapped[str] = mapped_column(String(32), nullable=True)

    entry_fee: Mapped[int] = mapped_column(nullable=True)

    #others

    date_posted: Mapped[DateTime] = mapped_column(DateTime(timezone=True),
                                                  server_default=func.now())

    host_id: Mapped[UUID] = mapped_column(ForeignKey("organizations.organization_id"))

    host_org: Mapped[Organizations] = relationship(back_populates="hosts")

    attendees: Mapped[list[User]] = relationship(secondary=attendees_table)

    def get_JSON(self):
        return Events.to_JSON(self)

    @staticmethod
    def to_JSON(event):
        return {
                "event_id": event.event_id,
                "host_id": event.host_id,
                "title": event.title,
                "thumbnail": event.thumbnail,
                "description": event.description,
                "url": event.url,
                "platform": event.platform,
                "tags": event.tags,
                "time_of": event.time_of.utcnow() if event.time_of else None,
                "host_org": event.host,
                "entry_fee": event.entry_fee,
                "date_posted": event.date_posted.utcnow() if event.date_posted else None,
                "attendees": [u.user_id for u in event.attendees],
                }
