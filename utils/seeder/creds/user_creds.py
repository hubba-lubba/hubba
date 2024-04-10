from requests import post
from json import loads
from os import environ
if not environ.get("api_key"):
    from creds.api_key import API_KEY
else :
    API_KEY = environ.get("api_key")

user1_cred = {
    "email": "test2@gmail.com",
    "username": "test_user_1",
    "password": "Password123"
}

user2_cred = {
    "email": "test3@gmail.com",
    "username": "test_user_2",
    "password": "Password123"
}

users = [user1_cred, user2_cred]

def signin(email, password):
    endpoint = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    data = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    return loads(post(endpoint, json=data).content).get("idToken")

if __name__ == "__main__":
    for user in user_creds:
        print("User: ", user)
        print(signin(user["username"], user["password"]))

