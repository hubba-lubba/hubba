from flask import Flask
from routes.events import events_blueprint
from flask_cors import CORS
import os
from events.subscriber import EventSubscriber
from engine import engine

def init_subscriber():
    subscriber_pid = os.fork()
    if subscriber_pid != 0: return

    subscriber = EventSubscriber(engine)
    subscriber.listen()

def init_app():
    app = Flask(__name__)
    app.register_blueprint(events_blueprint)
    cors = CORS(app)

    with app.app_context():
        init_subscriber()

    return app
