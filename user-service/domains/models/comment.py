from domains.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy import ForeignKey
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID


class Comment(Base):
    __tablename__ = "comments"

    coid: Mapped[UUID] = mapped_column(UUID(as_uuid=True),
                                       primary_key=True,
                                       default=uuid4)

    cid: Mapped[UUID] = mapped_column(ForeignKey("catches.cid"),
                                      nullable=False)

    uid: Mapped[UUID] = mapped_column(ForeignKey("users.uid"),
                                      nullable=False)

    comment: Mapped[str] = mapped_column(String(512),
                                         nullable=False)

    def get_JSON(self):
        return {
            "coid": self.coid,
            "cid": self.cid,
            "comment": self.comment
            }

    @staticmethod
    def to_JSON(comment):
        return {
            "coid": comment.coid,
            "cid": comment.cid,
            "comment": comment.comment
            }
