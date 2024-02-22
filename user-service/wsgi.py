from api import init_app
from logger import LoggerFactory

logger_factory = LoggerFactory()
logger = logger_factory.get_logger()

app = init_app()
logger.info(app.url_map)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
