from firebase_admin import credentials, initialize_app
from creds.user_creds import users, signin
from creds.events_creds import events
from os import environ
from user_seeder import seed_users, synchronize_user_api_version
from events_seeder import seed_events, synchronize_events_api_version

VERSION = environ.get("VERSION")
MAX_ATTEMPTS = 30

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def seed(users):
    for user in users:
        user["token_id"] = signin(user["email"], user["password"])

    #seed users
    synchronize_user_api_version()
    seed_users(users)

    #seed events
    synchronize_events_api_version()
    seed_events(events)
    
if __name__ == "__main__":
    print("Initializing Firebase...", flush=True)
    init_firebase()
    print("Seeding Users...", flush=True)
    seed(users)
