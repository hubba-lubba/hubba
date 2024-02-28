class IdExistsException(Exception):
    def __init__(self, class_name, id):
        self.id = id
        self.class_name = class_name

    def __str__(self):
        return f"{self.class_name} with id {self.id} exists"


class IdMissingException(Exception):
    def __init__(self, class_name, id):
        self.id = id
        self.class_name = class_name

    def __str__(self):
        return f"{self.class_name} with id {self.id} does not exist"
