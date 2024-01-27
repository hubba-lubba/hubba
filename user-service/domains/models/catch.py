from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID


class Catch(Base):
    __tablename__ = "catches"

    cid: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                      primary_key=True,
                                      default=uuid4)
    post_time: Mapped[DateTime] = mapped_column(DateTime(timezone=True),
                                                server_default=func.now())
    uid: Mapped[UUID] = mapped_column(ForeignKey("users.uid"),
                                      nullable=False)
    species: Mapped[str] = mapped_column(String(128), nullable=False)
    weight: Mapped[float] = mapped_column(nullable=False)
    size: Mapped[float] = mapped_column(nullable=False)
    type: Mapped[int] = mapped_column(nullable=False)
    likes: Mapped[int] = mapped_column(nullable=False)
    iid: Mapped[str] = mapped_column(String(64), nullable=False)

    def get_JSON(self):
        return {
            "cid": self.cid,
            "uid": self.uid,
            "species": self.species,
            "weight": self.weight,
            "size": self.size,
            "type": self.type,
            "likes": self.likes,
            "iid": self.iid
        }

    @staticmethod
    def to_JSON(catch):
        return {
            "cid": catch.cid,
            "uid": catch.uid,
            "species": catch.species,
            "weight": catch.weight,
            "size": catch.size,
            "type": catch.type,
            "likes": catch.likes,
            "image_id": catch.iid
        }
