from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from domains.repositories.catch_repository import CatchRepository
from domains.models.catch import Catch
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS

from routes.utils import require_json_params, require_query_params

user_blueprint = Blueprint('user_api', __name__, url_prefix="/user_api")
CORS(user_blueprint)


@user_blueprint.route("/add_user", methods=["PUT"])
@require_json_params(["username", "uid"])
def add_user():
    context = request.get_json()

    username = context.get("username")
    uid = context.get("uid")

    with Session(engine) as session:
        user_repository = UserRepository(session)
        try:
            new_user = user_repository.add_user(uid=uid, username=username)
            return jsonify({
                    "status": "success",
                    "uid": new_user.uid
                })
        except (IdExistsException, UsernameExistsException) as e:
            result = jsonify({
                    "status": "failure",
                    "reason": str(e)
                })
            return result, 400


@user_blueprint.route("/get_user", methods=["GET"])
@require_query_params(["uid"])
def get_user():
    uid = request.args.get("uid")
    with Session(engine) as session:
        try:
            user_repository = UserRepository(session)
            catches_repository = CatchRepository(session)
            catches = catches_repository.get_catches(uid=uid)
            catches = list(map(lambda x: Catch.to_JSON(x), catches))
            user = user_repository.get_user(uid=uid)
            response = jsonify({
                        "status": "success",
                        "user": user.get_JSON(),
                        "catches": catches
                    })
            return response
        except IdMissingException as e:
            result = jsonify({
                    "status": "failure",
                    "reason": str(e)
                })
            return result, 400
