from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from config import VERSION
from engine import engine
from events.publisher import EventPublisher
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS
from routes.utils import *
from firebase_admin import auth

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
def add_user():
    context = request.get_json()
    id_token = request.headers.get("id_token")
    user_id = auth.verify_id_token(id_token)["uid"]
    username = auth.get_user(user_id).display_name
    streaming_status = context.get("streaming_status") if context.get("streaming_status") else None

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

@user_blueprint.route("/add_following", methods=["PATCH"])
@ensure_authorized()
@require_json_params(["following"])
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
        except (IdMissingException, SelfReferentialFollowException, DuplicateFollowException) as e:
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

@user_blueprint.route("/", methods=["PATCH"])
@ensure_authorized()
def patch_user():
    context = request.get_json()
    username = context.get("username") if context.get("username") else None
    streaming_status = context.get("streaming_status") if context.get("streaming_status") else None
    profile_picture = context.get("profile_picture") if context.get("profile_picture") else None
    id_token = request.headers.get("id_token")
    user_id = auth.verify_id_token(id_token)["uid"]

    with Session(engine) as session:
        user_repository = UserRepository(session)
        try:
            updated_user = user_repository.update_user(username=username, 
                                                       user_id=user_id, 
                                                       streaming_status=streaming_status,
                                                       profile_picture=profile_picture)
            response = jsonify({
                "status": "success",
                "user": updated_user.get_JSON(),
            })
            return response
        except NonUniqueException as e:
            result = jsonify({
                    "status": "failure",
                    "reason": str(e)
            })
            return result, 400
