from sqlalchemy import create_engine
from domains.models.comment import Comment
from domains.models.user import User
from domains.models.catch import Catch
from domains.models.base import Base
from sqlalchemy.orm import Session
from config import *

#WARNING!!! DO NOT USE THIS IN PRODUCTION uwu. EVEN HAVING THIS HERE IS VERY BAD PRACTICE FOR OBVIOUS REASONS
RESET_DB = True

engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}",
                       echo=True)
if RESET_DB:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with Session(engine) as session:
        session.begin()
        user1 = User()
        user1.uid = "g8Vs7pZe2GgnKqPmEIIv00hxus93"
        user1.username = "username"
        user1.biography = "hello there!"
        session.add(user1)
        session.commit()

        session.begin()
        user2 = User()
        user2.uid = "5bLPjv7Rm3auBRCohfecCAiiWsQ2"
        user2.username = "spongebob"
        user2.biography = "Who lives in a pineapple under the sea?"
        session.add(user2)
        session.commit()

        catch1 = Catch()
        catch1.uid = user1.uid
        catch1.species = "fish"
        catch1.weight = 4
        catch1.size = 2.3
        catch1.type = 1
        catch1.likes = 4
        catch1.iid = "wow3"
        session.add(catch1)

        catch2 = Catch()
        catch2.uid= user1.uid
        catch2.species = "jellyfish"
        catch2.weight = 4.2
        catch2.size = 2
        catch2.type = 2
        catch2.likes = 5
        catch2.iid = "wow"
        session.add(catch2)

        catch3 = Catch()
        catch3.uid = user2.uid
        catch3.species = "fish"
        catch3.weight = 2.9
        catch3.size = 1
        catch3.type = 1
        catch3.likes = 2
        catch3.iid = "wow2"
        session.add(catch3)

        catch4 = Catch()
        catch4.uid = user2.uid
        catch4.species = "fish"
        catch4.weight = 1.3
        catch4.size = 1.2
        catch4.type = 1
        catch4.likes = 9
        catch4.iid = "wow4"
        session.add(catch4)
        session.commit()

        comment1 = Comment()
        comment1.uid = str(user1.uid)
        comment1.cid = str(catch1.cid)
        comment1.comment = "wow"
        session.add(comment1)

        comment2 = Comment()
        comment2.uid = str(user2.uid)
        comment2.cid = str(catch1.cid)
        comment2.comment = "nice"
        session.add(comment2)

        comment3 = Comment()
        comment3.uid = str(user1.uid)
        comment3.cid = str(catch3.cid)
        comment3.comment = "damn"
        session.add(comment3)

        comment4 = Comment()
        comment4.uid = str(user2.uid)
        comment4.cid = str(catch3.cid)
        comment4.comment = "yooo"
        session.add(comment4)

        comment5 = Comment()
        comment5.uid = str(user2.uid)
        comment5.cid = str(catch2.cid)
        comment5.comment = "lmao"
        session.add(comment5)

        comment6 = Comment()
        comment6.uid = str(user1.uid)
        comment6.cid = str(catch4.cid)
        comment6.comment = "xD"
        session.add(comment6)

        comment7 = Comment()
        comment7.uid = str(user2.uid)
        comment7.cid = str(catch4.cid)
        comment7.comment = "oof"
        session.add(comment7)

        session.commit()
