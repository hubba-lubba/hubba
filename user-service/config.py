import os

DB_HOSTNAME = os.environ.get("INPUT_DB_HOSTNAME", "hubba-db")
DB_USER = os.environ.get("INPUT_DB_USER", "hubba")
DB_PASSWORD = os.environ.get("INPUT_DB_PASSWORD", "hubba")
DB_PORT = os.environ.get("INPUT_DB_PORT", "5432")
DB_NAME = os.environ.get("INPUT_DB_NAME", "hubba")
