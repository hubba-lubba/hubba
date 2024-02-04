import os

DB_HOSTNAME = os.environ.get("DB_HOSTNAME", "hubba_db")
DB_USER = os.environ.get("DB_USER", "hubba")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "hubba")
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "hubba")
VERSION = os.environ.get("VERSION", "NA")
