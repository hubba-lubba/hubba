from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from domains.models.organizations import Organizations
else:
    Organizations = "Organizations"
from domains.models.base import Base
import domains.models.organizations as organizations 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                         primary_key=True,
                                         default=uuid.uuid4)
 
    in_org: Mapped[list[Organizations]] = relationship(secondary=organizations.moderator_table,
                                                    back_populates="users")

    moderates: Mapped[list[Organizations]] = relationship(secondary=organizations.moderator_table,
                                                    back_populates="moderators")
    
    owns: Mapped[list[Organizations]] = relationship(back_populates="owner")
