import os

#db related globals
DB_HOSTNAME = os.environ.get("DB_HOSTNAME", "hubba_db")
DB_USER = os.environ.get("DB_USER", "hubba")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "hubba")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "hubba-events")

#build related globals
VERSION = os.environ.get("VERSION", "NA")

#google pubsub related globals
PROJECT_ID = os.environ.get("PROJECT_ID", "hubba-412704")
USER_EVENT_SUBSCRIPTION_ID = os.environ.get("USER_EVENT_SUBSCRIPTION_ID", "dev-user-event")
EVENTS_EVENT_SUBSCRIPTION_ID = os.environ.get("EVENTS_EVENT_SUBSCRIPTION_ID", "dev-events-event")
ORGANIZATIONS_EVENT_SUBSCRIPTION_ID = os.environ.get("ORGANIZATIONS_EVENT_SUBSCRIPTION_ID", "dev-organizations-event")
USER_EVENT_TOPIC_ID = os.environ.get("USER_EVENT_TOPIC_ID", "dev-user-event")
EVENTS_EVENT_TOPIC_ID = os.environ.get("EVENTS_EVENT_TOPIC_ID", "dev-events-event")
ORGANIZATIONS_EVENT_TOPIC_ID = os.environ.get("ORGANIZATIONS_EVENT_TOPIC_ID", "dev-organizations-event")
SERVICE_ACCOUNT = os.environ.get("SERVICE_ACCOUNT", None)

PORT = 8000
