from functools import wraps
from flask import request, jsonify
from firebase_admin import auth

def ensure_authorized():
    def decorator(func):
        @wraps(func)
        def returned_func(*args, **kwargs):
            id_token = request.headers.get("id_token")

            if id_token is None:
                return jsonify({
                    "status": "failure", 
                    "reason": "missing id_token header"
                }), 400
            try: 
                auth.verify_id_token(id_token)
            except (auth.ExpiredIdTokenError, auth.InvalidIdTokenError) as e:
                return jsonify({
                    "status": "failure", 
                    "reason": "unable to verify id_token",
                    "message": str(e)
                }), 401
            return func(*args, **kwargs)
        return returned_func
    return decorator
