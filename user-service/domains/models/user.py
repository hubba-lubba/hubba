from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Table, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import String
import uuid

following_table = Table(
    "following_table",
    Base.metadata,
    Column("user", UUID, ForeignKey("users.user_id"), primary_key=True),
    Column("follows", UUID, ForeignKey("users.user_id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                         primary_key=True,
                                         default=uuid.uuid4)

    username: Mapped[str] = mapped_column(String(64),
                                          nullable=False,
                                          unique=True)

    followers: Mapped[list["User"]] = relationship("User", secondary=following_table,
                                                   primaryjoin=user_id==following_table.c.follows,
                                                   secondaryjoin=user_id==following_table.c.user,
                                                   back_populates="following")

    following: Mapped[list["User"]] = relationship("User", secondary=following_table, 
                                                   primaryjoin=user_id==following_table.c.user,
                                                   secondaryjoin=user_id==following_table.c.follows,
                                                   back_populates="followers")

    streaming_status: Mapped[str] = mapped_column(String(12),
                                                  nullable=True)

    #videos: Mapped[list[UUID]] = relationship(back_populates="videos")

    #events: Mapped[list[UUID]] = relationship(back_populates="events")

    #organizations: Mapped[list[UUID]] = relationship(back_populates="organizations")

    def get_JSON(self):
        return User.to_JSON(self)

    @staticmethod
    def get_following(user):
        return list(map(lambda user: user.user_id, user.following))

    @staticmethod
    def get_followers(user):
        return list(map(lambda user: user.user_id, user.followers))

    @staticmethod
    def to_JSON(user):
        return {
            "user_id": user.user_id,
            "username": user.username,
            "streaming_status": user.streaming_status,
            "following": User.get_following(user),
            "followers": User.get_followers(user),
            "num_following": len(user.following),
            "num_followers": len(user.followers)
        }
