class UsernameExistsException(Exception):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f"User with username {self.username} exists"


class IdExistsException(Exception):
    def __init__(self, user_id):
        self.user_id = user_id

    def __str__(self):
        return f"User with user_id {self.user_id} exists"


class IdMissingException(Exception):
    def __init__(self, user_id):
        self.user_id = user_id

    def __str__(self):
        return f"User with user_id {self.user_id} does not exist"


class SelfReferentialFollowException(Exception):
    def __init__(self, user_id):
        self.user_id = user_id

    def __str__(self):
        return f"User with user_id {self.user_id} cannot follow themself"
