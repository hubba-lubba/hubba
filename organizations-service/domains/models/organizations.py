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

user_table = Table("user_table",
                   Base.metadata,
                   Column("organization", 
                          UUID, 
                          ForeignKey("organizations.organization_id"), 
                          primary_key=True),
                   Column("user", 
                          String(32), 
                          ForeignKey("users.user_id"), 
                          primary_key=True))

event_table = Table("event_table",
                    Base.metadata,
                    Column("organization", 
                           UUID, 
                           ForeignKey("organizations.organization_id"), 
                           primary_key=True),
                    Column("event", 
                           UUID, 
                           ForeignKey("events.event_id"), 
                           primary_key=True))

class Organizations(Base):
    __tablename__ = "organizations"

    organization_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                                  primary_key=True,
                                                  default=uuid.uuid4)
                            
    name: Mapped[str] = mapped_column(String(32),
                                      nullable=True)

    image: Mapped[str] = mapped_column(String(128), 
                                       nullable=True)

    description: Mapped[str] = mapped_column(String(128), 
                                             nullable=True)

    owner_id: Mapped[str] = mapped_column(ForeignKey("users.user_id"))

    owner: Mapped[User] = relationship(back_populates="owns")

    users: Mapped[list[User]] = relationship(secondary=user_table,
                                             back_populates="in_org")

    events: Mapped[list[Events]] = relationship(secondary=event_table,
                                                back_populates="has_event")

    channel: Mapped[str] = mapped_column(String(128),
                                         nullable=True)

    def get_JSON(self):
        return Organizations.to_JSON(self)

    @staticmethod
    def to_JSON(organization):
        return {
            "organization_id": str(organization.organization_id),
            "name": organization.name,
            "image": organization.image,
            "description": organization.description,
            "owner": organization.owner.user_id,
            "users": [user.user_id for user in organization.users],
            "events": [event.get_JSON() for event in organization.events],
            "channel": organization.channel
        }
