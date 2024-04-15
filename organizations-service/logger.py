import sys
import logging

yellow = "\x1b[33;20m"
reset = "\x1b[0m"

class LoggerFactory():
    def get_logger(self):
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.DEBUG)

        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.DEBUG)

        formatter = logging.Formatter(yellow + "[%(asctime)s] [%(process)d] [%(levelname)s] %(message)s",
                                      "%Y-%m-%d %H:%M:%S +0000" + reset)
        ch.setFormatter(formatter)

        logger.addHandler(ch)
        return logger
