import os

DB_HOSTNAME = os.environ.get("DB_HOSTNAME", "reels-db")
DB_USER = os.environ.get("DB_USER", "reels")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "reels")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "reels")
