from google.cloud import pubsub_v1
from google.protobuf.json_format import Parse
from google.oauth2 import service_account
from events.protobuf_files.events_pb2 import Event
from os import getpid
from logger import LoggerFactory
from config import *
from engine import engine
from domains.repositories.user_repository import UserRepository
from sqlalchemy.orm import Session
import json

class EventSubscriber():
    def __init__(self, engine):
        logger_factory = LoggerFactory()
        self.logger = logger_factory.get_logger()

        self.engine = engine

        project_id = PROJECT_ID
        subscription_id = ORGANIZATIONS_EVENT_SUBSCRIPTION_ID

        self.logger.info(f"Using project_id: {project_id}")
        self.logger.info(f"Using subscription_id: {subscription_id}")

        if SERVICE_ACCOUNT is None or not SERVICE_ACCOUNT:
            credentials = service_account.Credentials.from_service_account_file("./events/hubba-credentials.json")
        else:
            self.logger.info("Using service account from environment variable")
            SA_json = json.loads(SERVICE_ACCOUNT)
            credentials = service_account.Credentials.from_service_account_info(SA_json)

        subscriber = pubsub_v1.SubscriberClient(credentials=credentials)
        subscription_path = subscriber.subscription_path(project_id, subscription_id)
        self.streaming_pull_future = subscriber.subscribe(subscription_path, callback=self.callback)

        self.logger.info(f"Started subscriber process on pid {getpid()}")
        self.logger.info(f"Subscriber listening on subscription '{subscription_id}'")
  
    def handle_user_event(self, data):
        self.logger.info(f"user_event:\n {data}")
        with Session(engine) as session:
            user_repository = UserRepository(session)
            if data.action:
                user_repository.add_user(user_id=data.uuid)
            else:
                user_repository.delete_user(user_id=data.uuid)

    def handle_event(self, event):
        try:
            match event.domain:
                case "user":
                    self.handle_user_event(event)
                case _:
                    pass
        except:
            pass

    def callback(self, message):
        event = Event()
        Parse(message.data, event)
        self.logger.info(f"Received message: {message.message_id}")
        self.handle_event(event)
        message.ack()
    
    def listen(self):
        self.streaming_pull_future.result()

if __name__ == "__main__":
    subscriber = EventSubscriber(None)
    subscriber.listen()
