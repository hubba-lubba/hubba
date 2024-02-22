from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.user import User
else:
    User = "User"
from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Table, Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

event_moderator_table = Table("event_moderator_table",
                              Base.metadata,
                              Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                              Column("moderator", UUID, ForeignKey("users.user_id"), primary_key=True))

user_table = Table("user_table",
                              Base.metadata,
                              Column("event", UUID, ForeignKey("events.event_id"), primary_key=True),
                              Column("user", UUID, ForeignKey("users.user_id"), primary_key=True))

class Events(Base):
    __tablename__ = "events"

    event_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                         primary_key=True,
                                         default=uuid.uuid4)
                            
    date_posted: Mapped[DateTime] = mapped_column(DateTime(timezone=True),
                                                    server_default=func.now())

    title: Mapped[str] = mapped_column(String(32))

    description: Mapped[str] = mapped_column(String(128))

    owner_id: Mapped[UUID] = mapped_column(ForeignKey("users.user_id"))

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
            "date_posted": str(user.date_posted),
            "title": user.title,
            "description": user.description,
            "owner_id": str(user.owner_id)
        }
