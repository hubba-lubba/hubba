from google.cloud import pubsub_v1
from google.oauth2 import service_account
from google.protobuf.json_format import MessageToJson
#from events.events_pb2 import Event
from events_pb2 import Event

class EventPublisher():
    def __init__(self):
        project_id = "hubba-412704"
        topic_id = "dev-user-event"
        credentials = service_account.Credentials.from_service_account_file("./hubba-412704-025c0a022d7e.json")
        self.publisher_client = pubsub_v1.PublisherClient(credentials=credentials, 
                                                publisher_options = pubsub_v1.types.PublisherOptions(
                                                enable_message_ordering=True))
        self.topic_path = self.publisher_client.topic_path(project_id, topic_id)
        self.topic = self.publisher_client.get_topic(request = {"topic": self.topic_path})
        self.encoding = self.topic.schema_settings.encoding
    
    def publish(self, domain, action, uuid):
        event = Event()
        event.domain = domain
        event.action = action
        event.uuid = uuid
        event_json = MessageToJson(event)
        encoded_message = str(event_json).encode("utf-8")
        future = self.publisher_client.publish(self.topic_path, data=encoded_message, ordering_key=uuid)
        print(f"Published message {future.result()} domain = {domain}")

if __name__ == "__main__":
    publisher = EventPublisher()
    uuid = "uuid-field"
    event_type = True
    
    for i in range(10):
        publisher.publish(str(i), event_type, uuid)
