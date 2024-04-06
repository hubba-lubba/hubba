from firebase_admin import auth, credentials, initialize_app

def seed_users():
    pass

def get_users():
    for user in auth.list_users().iterate_all():
        print('User: ' + user.uid)

def init_firebase():
    cred = credentials.Certificate('firebase-sa-cred.json')
    initialize_app(cred)

if __name__ == "__main__":
    init_firebase()
    get_users()
