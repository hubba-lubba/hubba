from functools import wraps
from flask import request, jsonify
import uuid
from firebase_admin import auth


def require_json_params(params):
    def decorator(func):
        @wraps(func)
        def returned_func(*args, **kwargs):
            context = request.get_json()
            for i in params:
                if context.get(i) is None:
                    return jsonify({
                        "status": "failure", "reason": f"missing {i}"
                    })
            return func(*args, **kwargs)
        return returned_func
    return decorator


def require_query_params(query_args):
    def decorator(func):
        @wraps(func)
        def returned_func(*args, **kwargs):
            for i in query_args:
                if request.args.get(i) is None:
                    return jsonify({
                        "status": "failure", "reason": f"missing argument {i}"
                    })
            return func(*args, **kwargs)
        return returned_func
    return decorator

def ensureUUID(field):
    def decorator(func):
        @wraps(func)
        def returned_func(*args, **kwargs):
            id = None
            id = request.args.get(field) if request.args.get(field) is not None else request.get_json().get(field)
            try:
                if isinstance(id, list):
                    list(map(lambda x: uuid.UUID(x), id))
                else:
                    uuid.UUID(id)
            except ValueError:
                return jsonify({
                    "status": "failure", 
                    "reason": "unable to parse uuid"
                })

            return func(*args, **kwargs)
        return returned_func
    return decorator

def ensureAuthorized():
    def decorator(func):
        @wraps(func)
        def returned_func(*args, **kwargs):
            request_json = request.get_json()
            if request_json.get("admin") is not None and request_json.get("admin") == "true":
                return func(*args, **kwargs)

            if request_json.get("id_token") is None:
                return jsonify({
                    "status": "failure", 
                    "reason": "missing id_token header"
                })
            try: 
                auth.verify_id_token(request_json.get("id_token"))
            except (auth.ExpiredIdTokenError, auth.InvalidIdTokenError) as e:
                return jsonify({
                    "status": "failure", 
                    "reason": "unable to verify id_token",
                    "message": str(e)
                })
            return func(*args, **kwargs)
        return returned_func
    return decorator
