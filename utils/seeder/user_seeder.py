from requests import put
from os import environ
from json import loads
from time import sleep
from requests import get

VERSION = environ.get("VERSION")
MAX_ATTEMPTS = 30

def create_user(user):
    res_body = {
    }
    headers = {'content-type': 'application/json',
               'id_token': f'{user["token_id"]}'
    }
    res = put("http://user-api.eddisonso.com", json=res_body, headers=headers)
    return res.content

def seed_users(users):
    for user in users:
        print(create_user(user), flush=True)

def synchronize_user_api_version():
    ready = False
    attempts = 0
    curr_version = "NA"

    #Seed users
    while not ready and attempts <= MAX_ATTEMPTS:
        print(f"Trying to get correct users version... ({attempts})", flush=True)
        try:
            curr_version = loads(get("http://user-api.eddisonso.com/version").content).get("version")
            if curr_version == VERSION:
                ready = True
                print("Got correct version for user-api allowing 30 seconds to stabilize", flush=True)
                sleep(30)
                break
        except:
            pass
        print(f"Incorrect user-api version. Got {curr_version} need {VERSION}. Retrying...", flush=True)
        attempts += 1
        sleep(5)
