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

class Organizations(Base):
    __tablename__ = "organizations"

    organization_id: Mapped[UUID] = mapped_column(UUID,
                                                  primary_key=True)
 
    hosts: Mapped[list[Events]] = relationship(back_populates="host_org")
