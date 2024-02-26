from flask import Blueprint, jsonify, request
from domains.repositories.events_repository import EventsRepository
from domains.repositories.repo_exceptions import IdMissingException
from config import VERSION
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS
from routes.utils import ensureUUID, require_json_params, require_query_params

events_blueprint = Blueprint('events_api', __name__, url_prefix="/")
CORS(events_blueprint)

@events_blueprint.route("/healthcheck")
def healthcheck():
    result = jsonify({
        "status": "success"
    })
    return result

@events_blueprint.route("/version")
def version():
    result = jsonify({
        "version": VERSION
    })
    return result

@events_blueprint.route("/")
def base():
    result = jsonify({
        "api": "events"
    })
    return result, 200

@events_blueprint.route("/", methods=["PUT"])
@require_json_params(["title", "description", "owner", "moderators", "users"])
@ensureUUID("users")
@ensureUUID("moderators")
@ensureUUID("owner")
def add_event():
    context = request.get_json()

    title = context.get("title")
    description = context.get("description")
    owner = context.get("owner")
    moderators = context.get("moderators")
    users = context.get("users")

    with Session(engine) as session:
        events_repository = EventsRepository(session)
        event = events_repository.add_event(title=title, description=description, owner=owner, moderators=moderators, users=users)
        response = jsonify({
            "status": "success",
            "event": event.get_JSON()
        })
        return response

@events_blueprint.route("/", methods=["GET"])
@require_query_params(["event_id"])
@ensureUUID("event_id")
def get_event():
    event_id = request.args.get("event_id")
    if not event_id:
        response = jsonify({
            "status": "error",
            "message": "event_id is required"
        })
        response.status_code = 400
        return response

    with Session(engine) as session:
        events_repository = EventsRepository(session)
        try:
            event = events_repository.get_event(event_id=event_id)
            response = jsonify({
                "status": "success",
                "event": event.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response
