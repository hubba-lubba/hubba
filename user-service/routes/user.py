from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from config import VERSION
from engine import engine
from events.publisher import EventPublisher
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS
from routes.utils import *

user_blueprint = Blueprint('user_api', __name__, url_prefix="/")
CORS(user_blueprint)
publisher = EventPublisher("user")

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

@user_blueprint.route("/all", methods=["GET"])
@ensure_authorized()
def get_all_users():
    with Session(engine) as session:
        user_repository = UserRepository(session)
        users = user_repository.get_all_users()
        response = jsonify({
            "status": "success",
            "users": [user.get_JSON() for user in users]
        })
        return response

@user_blueprint.route("/", methods=["PUT"])
@ensure_authorized()
@require_json_params(["username"])
def add_user():
    context = request.get_json()

    username = context.get("username")
    if not username:
        result = jsonify({
            "status": "failure",
            "reason": "missing username or username is empty"
        })
        return result, 400
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
        except (IdExistsException, NonUniqueException) as e:
            result = jsonify({
                    "status": "failure",
                    "reason": str(e)
                })
            return result, 400


@user_blueprint.route("/", methods=["GET"])
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

@user_blueprint.route("/", methods=["DELETE"])
@ensure_authorized()
@require_query_params(["user_id"])
@ensure_UUID("user_id")
def delete_user():
    user_id = request.args.get("user_id")
    with Session(engine) as session:
        try:
            user_repository = UserRepository(session)
            user_id = user_repository.delete_user(user_id=user_id)
            response = jsonify({
                "status": "success",
                "user_id": user_id
            })
            return response
        except IdMissingException as e:
            result = jsonify({
                "status": "failure",
                "reason": str(e)
            })
            return result, 400

@user_blueprint.route("/add_following", methods=["POST"])
@ensure_authorized()
@require_json_params(["user_id", "following"])
@ensure_UUID("user_id")
@ensure_UUID("following")
def add_following():
    context = request.get_json()

    curr_user_id = auth.verify_id_token(request.headers.get("id_token")).get("uid")
    new_following = context.get("following")
    with Session(engine) as session:
        try:
            user_repository = UserRepository(session)
            user = user_repository.add_following(user_id=curr_user_id,
                                                 following=new_following)
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

@user_blueprint.route("/get_current_user", methods=["GET"])
@ensure_authorized()
def get_current_user():
    user_id = auth.verify_id_token(request.headers.get("id_token")).get("uid")
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
