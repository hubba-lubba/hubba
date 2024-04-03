from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.events import Events
else:
    Events = "Events"
from domains.models.base import Base
import domains.models.events as events
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String
import uuid

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[str] = mapped_column(String(32),
                                         primary_key=True)
 
    moderates: Mapped[list[Events]] = relationship(secondary=events.event_moderator_table,
                                                    back_populates="moderators")
    
    owns: Mapped[list[Events]] = relationship(back_populates="owner")
