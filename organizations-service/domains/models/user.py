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
from sqlalchemy import String
import uuid

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[str] = mapped_column(String(32),
                                         primary_key=True)
 
    in_org: Mapped[list[Organizations]] = relationship(secondary=organizations.user_table,
                                                       back_populates="users")

    owns: Mapped[list[Organizations]] = relationship(back_populates="owner")
