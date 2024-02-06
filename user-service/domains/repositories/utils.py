from functools import wraps
from domains.repositories.repo_exceptions import IdExistsException, IdMissingException, UsernameExistsException
from domains.models.user import User

def check_id_not_exists(ids):
    def decorator(func):
        @wraps(func)
        def returned_func(self, *args, **kwargs):
            for id in ids:
                match id:
                    case "user_id":
                        if self.session.get(User, kwargs["user_id"]) is not None:
                            raise IdExistsException(kwargs["user_id"])
                    case "username":
                        if self.session.query(User).filter(User.username == kwargs["username"]).first() is not None:
                            raise UsernameExistsException(kwargs["username"])
            return func(self, *args, **kwargs)
        return returned_func
    return decorator

def check_id_exists(ids):
    def decorator(func):
        @wraps(func)
        def returned_func(self, *args, **kwargs):
            for id in ids:
                if kwargs[id] is list and kwargs[id]:
                    users = filter(lambda x: self.session.get(User, x) is None, kwargs[id])
                    if users:
                        raise IdMissingException(users)
                else:
                    if self.session.get(User, kwargs[id]) is None:
                        raise IdMissingException(kwargs[id])
            return func(self, *args, **kwargs)
        return returned_func
    return decorator
