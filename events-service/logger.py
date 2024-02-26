import sys
import logging

class LoggerFactory():
    def get_logger(self):
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.DEBUG)

        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.DEBUG)

        formatter = logging.Formatter("[%(asctime)s] [%(process)d] [%(levelname)s] %(message)s",
                                      "%Y-%m-%d %H:%M:%S +0000")
        ch.setFormatter(formatter)

        logger.addHandler(ch)
        return logger
