from flask import Flask
from routes.user import user_blueprint
from flask_cors import CORS
import os
from engine import engine

def init_app():
    app = Flask(__name__)
    app.register_blueprint(user_blueprint)
    cors = CORS(app)

    return app
