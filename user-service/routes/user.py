from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from config import VERSION
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS

from routes.utils import ensureUUID, require_json_params, require_query_params

user_blueprint = Blueprint('user_api', __name__, url_prefix="/")
CORS(user_blueprint)

@user_blueprint.route("/healthcheck")
def healthcheck():
    result = jsonify({
        "status": "success"
    })
    return result

@user_blueprint.route("/version")
def version():
    result = jsonify({
        "version": VERSION
    })
    return result

@user_blueprint.route("/add_user", methods=["PUT"])
@require_json_params(["username"])
def add_user():
    context = request.get_json()

    username = context.get("username")
    user_id = context.get("user_id")
    streaming_status = context.get("streaming_status")

    with Session(engine) as session:
        user_repository = UserRepository(session)
        try:
            new_user = user_repository.add_user(username=username, user_id=user_id, 
                                                streaming_status=streaming_status)
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
@ensureUUID("user_id")
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

@user_blueprint.route("/add_following", methods=["POST"])
@require_json_params(["user_id"])
@ensureUUID("user_id")
def add_following():
    context = request.get_json()

    user_id = context.get("user_id")
    new_following = context.get("following")
    with Session(engine) as session:
        try:
            user_repository = UserRepository(session)
            user = user_repository.add_following(user_id=user_id,
                                                 new_following=new_following)
            response = jsonify({
                "status": "success",
                "user": user.get_JSON(),
            })
            return response
        except (IdMissingException, SelfReferentialFollowException) as e:
            result = jsonify({
                "status": "failure",
                "reason": str(e)
            })
            return result, 400
