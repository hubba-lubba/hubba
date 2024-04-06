user1_cred = {
        "username": "test2@gmail.com",
        "password": "Password123"
        }

user2_cred = {
        "username": "test3@gmail.com",
        "password": "Password123"
        }

user_creds = [user1_cred, user2_cred]

def get_id_token(user):
    return user['id_token']

if __name__ == "__main__":
    

