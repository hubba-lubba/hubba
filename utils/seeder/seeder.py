from firebase_admin import auth, credentials, initialize_app
from user_creds import users, signin
from requests import put, get
from os import environ
from json import loads

VERSION = environ.get("VERSION")
MAX_ATTEMPTS = 30

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

def create_user(user):
    res_body = {
        "username": user["username"]
    }
    res = put("http://user-api.eddisonso.com", json=res_body)
    return res.content

def seed_users(users):
    for user in users:
        create_user(user)

def seed(users):
    ready = False
    attempts = 0
    while not ready or attempts <= MAX_ATTEMPTS:
        try:
            if loads(get("http://user-api.eddisonso.com/version").content).get("version") == VERSION:
                ready = True
        except:
            attempts += 1
    for user in users:
        user["token_id"] = signin(user["username"], user["password"])
    
if __name__ == "__main__":
    init_firebase()
    seed(users)
