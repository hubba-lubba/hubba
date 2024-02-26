from api import init_app
from logger import LoggerFactory

app = init_app()
logger_factory = LoggerFactory()
logger = logger_factory.get_logger()

logger.info(app.url_map)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
