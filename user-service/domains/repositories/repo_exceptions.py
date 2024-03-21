class SelfReferentialFollowException(Exception):
    def __init__(self, user_id):
        self.user_id = user_id

    def __str__(self):
        return f"User with user_id {self.user_id} cannot follow themself"

class IdExistsException(Exception):
    def __init__(self, obj_class, id):
        self.id = id
        self.obj_class = obj_class 

    def __str__(self):
        return f"{self.obj_class.__name__} with id {self.id} exists"

class NonUniqueException(Exception):
    def __init__(self, obj_class, field):
        self.obj_class = obj_class
        self.field = field

    def __str__(self):
        return f"{self.obj_class.__name__} on column {self.field} already exists"

class IdMissingException(Exception):
    def __init__(self, obj_class, id):
        self.id = id
        self.obj_class = obj_class

    def __str__(self):
        return f"{self.obj_class.__name__} with id {self.id} does not exist"
