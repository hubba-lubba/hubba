from functools import reduce, wraps
from domains.repositories.repo_exceptions import *

def check_id_not_exists(obj, ids):
    def decorator(func):
        @wraps(func)
        def returned_func(self, *args, **kwargs):
            ids_flatten = []
            for id in ids:
                if kwargs[id]:
                    ids_flatten += [kwargs[id]] if kwargs[id] is not list else kwargs[id]

            for id in ids_flatten:
                if self.session.get(obj, id) is not None:
                    raise IdExistsException(obj, id)
            return func(self, *args, **kwargs)
        return returned_func
    return decorator

def check_id_exists(obj, ids):
    def decorator(func):
        @wraps(func)
        def returned_func(self, *args, **kwargs):
            ids_flatten = []
            for id in ids:
                if kwargs[id]:
                    ids_flatten += [kwargs[id]] if kwargs[id] is not list else kwargs[id]
            for id in ids_flatten:
                if self.session.get(obj, id) is None:
                    raise IdMissingException(obj, id)
            return func(self, *args, **kwargs)
        return returned_func
    return decorator
