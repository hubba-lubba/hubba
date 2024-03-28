from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.organizations import Organizations, event_table
else:
    Organizations = "Organizations"
from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Events(Base):
    __tablename__ = "events"

    event_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                           primary_key=True,
                                           default=uuid.uuid4)

    has_event: Mapped[list[Organizations]] = relationship(secondary=event_table,
                                                   back_populates="events")
