from logger import LoggerFactory
from flask import Flask
from config import PORT
from routes import blob_url_generator
from flask_cors import CORS
from firebase_admin import credentials, initialize_app

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def init_app():
    init_firebase()
    app = Flask(__name__)
    app.register_blueprint(blob_url_generator)
    cors = CORS(app)
    return app

app = init_app()
logger_factory = LoggerFactory()
logger = logger_factory.get_logger()

logger.info(app.url_map)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)
