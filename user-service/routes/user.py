from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS

from routes.utils import require_json_params, require_query_params

user_blueprint = Blueprint('user_api', __name__, url_prefix="/")
CORS(user_blueprint)

@user_blueprint.route("/")
def healthcheck():
    result = jsonify({
        "status": "success"
    })
    return result

@user_blueprint.route("/add_user", methods=["PUT"])
@require_json_params(["username", "uid"])
def add_user():
    context = request.get_json()

    username = context.get("username")

    with Session(engine) as session:
        user_repository = UserRepository(session)
        try:
            new_user = user_repository.add_user(username=username)
            response = jsonify({
                "status": "success",
                "user": new_user.get_JSON(),
            })
            return response
        except (IdExistsException, UsernameExistsException) as e:
            result = jsonify({
                    "status": "failure",
                    "reason": str(e)
                })
            return result, 400


@user_blueprint.route("/get_user", methods=["GET"])
@require_query_params(["user_id"])
def get_user():
    user_id = request.args.get("user_id")
    with Session(engine) as session:
        try:
            user_repository = UserRepository(session)
            user = user_repository.get_user(user_id=user_id)
            response = jsonify({
                "status": "success",
                "user": user.get_JSON(),
            })
            return response
        except IdMissingException as e:
            result = jsonify({
                "status": "failure",
                "reason": str(e)
            })
            return result, 400
