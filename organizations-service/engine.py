from sqlalchemy import create_engine
from domains.models.user import User
from domains.models.events import Events
from domains.models.base import Base
from sqlalchemy.orm import Session
from sqlalchemy_utils import database_exists, create_database
from config import *
from domains.models.events import event_moderator_table, user_table

#WARNING!!! DO NOT USE THIS IN PRODUCTION uwu. EVEN HAVING THIS HERE IS VERY BAD PRACTICE FOR OBVIOUS REASONS
RESET_DB = True

engine = create_engine(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}",
                       echo=True, pool_pre_ping=True)
if not database_exists(engine.url): create_database(engine.url)

if RESET_DB:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with Session(engine) as session:

        #TODO: Write a script to populate the database with some users

        session.commit()
