from flask import Flask
from routes.events import events_blueprint
from flask_cors import CORS
import os
from events.subscriber import EventSubscriber
from engine import engine
from firebase_admin import credentials, initialize_app
from logger import LoggerFactory

def init_subscriber():
    subscriber_pid = os.fork()
    if subscriber_pid != 0: return

    subscriber = EventSubscriber(engine)
    subscriber.listen()

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def init_app():
    logger_factory = LoggerFactory()
    logger = logger_factory.get_logger()
    logger.info("Initializing Firebase")
    init_firebase()
    app = Flask(__name__)
    logger.info("Registering Events Blueprint")
    app.register_blueprint(events_blueprint)
    cors = CORS(app)

    logger.info("Initializing Subscriber")
    with app.app_context():
        init_subscriber()

    return app
