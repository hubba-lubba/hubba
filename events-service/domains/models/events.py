from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.user import User
else:
    User = "User"
from domains.models.base import Base
from sqlalchemy import ForeignKey, Table, Column, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY
import uuid

event_moderator_table = Table("event_moderator_table",
                              Base.metadata,
                              Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                              Column("moderator", String(32), ForeignKey("users.user_id"), primary_key=True))

user_table = Table("user_table",
                   Base.metadata,
                   Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                   Column("user", String(32), ForeignKey("users.user_id"), primary_key=True))

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

    time_of_event: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True)

    host: Mapped[str] = mapped_column(String(32), nullable=True)

    entry_fee: Mapped[int] = mapped_column(nullable=True)

    #others

    date_posted: Mapped[DateTime] = mapped_column(DateTime(timezone=True),
                                                    server_default=func.now())

    owner_id: Mapped[str] = mapped_column(ForeignKey("users.user_id"))

    owner: Mapped[User] = relationship(back_populates="owns")

    moderators: Mapped[list[User]] = relationship(secondary=event_moderator_table,
                                                    back_populates="moderates")

    users: Mapped[list[User]] = relationship(secondary=user_table)

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
