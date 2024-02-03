from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String
import uuid


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                         primary_key=True,
                                         default=uuid.uuid4)

    username: Mapped[str] = mapped_column(String(64),
                                          nullable=False,
                                          unique=True)

    def get_JSON(self):
        return User.to_JSON(self)

    @staticmethod
    def to_JSON(user):
        return {
                    "user_id": user.user_id,
                    "username": user.username,
                }
