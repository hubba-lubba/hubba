from functools import wraps
from flask import request, jsonify


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
