from flask import Flask
from routes.user import user_blueprint
from routes.healthcheck import healthcheck_blueprint
from flask_cors import CORS


def init_app():
    app = Flask(__name__)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(healthcheck_blueprint)
    cors = CORS(app)
    return app

