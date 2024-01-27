from functools import wraps
from domains.repositories.repo_exceptions import IdExistsException, IdMissingException, UsernameExistsException
from domains.models.user import User

def check_id_exists(ids):
    def decorator(func):
        @wraps(func)
        def returned_func(self, *args, **kwargs):
            for id in ids:
                match id:
                    case "uid":
                        if self.session.get(User, kwargs["uid"]) is None:
                            raise IdMissingException(f"User with uid {kwargs['uid']} does not exists")
            return func(self, *args, **kwargs)
        return returned_func
    return decorator
