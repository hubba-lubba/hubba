from flask import Flask
from routes.organizations import organizations_blueprint
from flask_cors import CORS
import os
from events.subscriber import EventSubscriber
from engine import engine
from firebase_admin import credentials, initialize_app

def init_subscriber():
    subscriber_pid = os.fork()
    if subscriber_pid != 0: return

    subscriber = EventSubscriber(engine)
    subscriber.listen()

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def init_app():
    init_firebase()
    app = Flask(__name__)
    app.register_blueprint(organizations_blueprint)
    cors = CORS(app)

    with app.app_context():
        init_subscriber()

    return app
