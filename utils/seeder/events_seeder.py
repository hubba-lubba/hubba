from requests import put
from time import sleep
from requests import get
from json import loads
from os import environ

VERSION = environ.get("VERSION")
MAX_ATTEMPTS = 30

def create_event(event):
    res_body = {
        "title": event["title"],
        "description": event["description"],
    }
    headers = {'content-type': 'application/json',
               'id_token': f'{event["user"]["token_id"]}'
    }
    res = put("http://events-api.eddisonso.com", json=res_body, headers=headers)
    return res.content

def seed_events(events):
    for event in events:
        print(create_event(event), flush=True)

def synchronize_events_api_version():
    ready = False
    attempts = 0
    curr_version = "NA"
    #Seed events
    while not ready and attempts <= MAX_ATTEMPTS:
        print(f"Trying to get correct events version... ({attempts})", flush=True)
        try:
            curr_version = loads(get("http://events-api.eddisonso.com/version").content).get("version")
            if curr_version == VERSION:
                ready = True
                print("Got correct version for events-api allowing 30 seconds to stabilize", flush=True)
                sleep(30)
                break
        except:
            pass
        print(f"Incorrect events-api version. Got {curr_version} need {VERSION}. Retrying...", flush=True)
        attempts += 1
        sleep(5)
