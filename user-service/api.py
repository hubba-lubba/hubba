from flask import Flask
from routes.user import user_blueprint
from flask_cors import CORS
from firebase_admin import credentials, initialize_app

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def init_app():
    init_firebase()
    app = Flask(__name__)
    app.register_blueprint(user_blueprint)
    cors = CORS(app)

    return app
