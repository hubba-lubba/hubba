from firebase_admin import auth, credentials, initialize_app
from user_creds import users, signin
from requests import put, get
from os import environ
from json import loads
from time import sleep

VERSION = environ.get("VERSION")
MAX_ATTEMPTS = 30

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def create_user(user):
    res_body = {
        "username": user["username"]
    }
    headers = {"content-type": "application/json",
               "id_token": user["token_id"]
    }
    res = put("http://user-api.eddisonso.com", json=res_body)
    return res.content

def seed_users(users):
    for user in users:
        print(create_user(user), flush=True)

def seed(users):
    for user in users:
        user["token_id"] = signin(user["username"], user["password"])
    ready = False
    attempts = 0
    while not ready and attempts <= MAX_ATTEMPTS:
        print(f"Trying to correct version... ({attempts})", flush=True)
        try:
            curr_version = loads(get("http://user-api.eddisonso.com/version").content).get("version")
            if curr_version == VERSION:
                ready = True
                print("Got correct version for user-api", flush=True)
                break
        except:
            pass
        print(f"Incorrect user-api version. Got {curr_version} need {VERSION}. Retrying...", flush=True)
        attempts += 1
        sleep(5)
    seed_users(users)
    
if __name__ == "__main__":
    print("Initializing Firebase...", flush=True)
    init_firebase()
    print("Seeding Users...", flush=True)
    seed(users)
