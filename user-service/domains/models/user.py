from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String


class User(Base):
    __tablename__ = "users"

    uid: Mapped[str] = mapped_column(String(64),
                                     primary_key=True)

    username: Mapped[str] = mapped_column(String(64),
                                          nullable=False,
                                          unique=True)

    biography: Mapped[str] = mapped_column(String(512),
                                           nullable=True)

    def get_JSON(self):
        return {
                "uid": self.uid,
                "username": self.username,
                "biography": self.biography
                }

    @staticmethod
    def to_JSON(user):
        return {
                "uid": user.uid,
                "username": user.username,
                "biography": user.biography
                }
