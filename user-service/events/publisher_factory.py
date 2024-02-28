from events.publisher import EventPublisher
class PublisherFactory():
    def get_publisher(self):
        return EventPublisher("user")
