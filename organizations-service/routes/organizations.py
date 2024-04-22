from flask import Blueprint, jsonify, request
from domains.repositories.organizations_repository import OrganizationsRepository
from domains.repositories.repo_exceptions import IdMissingException
from config import VERSION
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS
from routes.utils import ensure_UUID, require_json_params, require_query_params, ensure_authorized
from firebase_admin import auth
from uuid import UUID

organizations_blueprint = Blueprint('organizations_api', __name__, url_prefix="/")
CORS(organizations_blueprint)

@organizations_blueprint.route("/healthcheck")
def healthcheck():
    result = jsonify({
        "status": "success"
    })
    return result

@organizations_blueprint.route("/version")
def version():
    result = jsonify({
        "version": VERSION
    })
    return result

@organizations_blueprint.route("/", methods=["PUT"])
@ensure_authorized()
@require_json_params(["name"])
def add_organization():
    context = request.get_json()

    name = context.get("name") if context.get("name") else None
    image = context.get("image") if context.get("image") else "https://via.placeholder.com/400"
    description = context.get("description") if context.get("description") else None
    channel = context.get("channel") if context.get("channel") else None
    owner = auth.verify_id_token(request.headers.get("id_token"))["uid"]

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.add_organization(
                name=name,
                image=image,
                description=description,
                owner=owner,
                channel=channel
            )
            response = jsonify({
                "status": "success",
                "organization": organization.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@organizations_blueprint.route("/", methods=["GET"])
@require_query_params(["organization_id"])
@ensure_UUID("organization_id")
def get_organization():
    organization_id = request.args.get("organization_id")

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.get_organization(organization_id=UUID(organization_id))
            response = jsonify({
                "status": "success",
                "organization": organization.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@organizations_blueprint.route("/", methods=["DELETE"])
@ensure_authorized()
@require_query_params(["organization_id"])
@ensure_UUID("organization_id")
def delete_organization():
    organization_id = request.args.get("organization_id")
    
    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization_id = organizations_repository.delete_organization(organization_id=UUID(organization_id))
            response = jsonify({
                "status": "success",
                "organization_id": organization_id 
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@organizations_blueprint.route("/", methods=["PATCH"])
@ensure_authorized()
@require_json_params(["organization_id"])
@ensure_UUID("organization_id")
def patch_organization():
    context = request.get_json()
    organization_id = context.get("organization_id")

    name = context.get("name") if context.get("name") else None
    image = context.get("image") if context.get("image") else None
    description = context.get("description") if context.get("description") else None
    channel = context.get("channel") if context.get("channel") else None

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.patch_organization(organization_id=UUID(organization_id),
                                                                       name=name,
                                                                       image=image,
                                                                       description=description,
                                                                       channel=channel)
            response = jsonify({
                "status": "success",
                "organization": organization.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response
@organizations_blueprint.route("/add_user", methods=["PATCH"])
@ensure_authorized()
@require_query_params(["organization_id"])
@ensure_UUID("organization_id")
def add_user():
    organization_id = request.args.get("organization_id")
    user_id = auth.verify_id_token(request.headers.get("id_token"))["uid"]

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.add_user(organization_id=organization_id,
                                                             user_id=user_id)
            response = jsonify({
                "status": "success",
                "organization": organization.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@organizations_blueprint.route("/delete_user", methods=["PATCH"])
@ensure_authorized()
@require_query_params(["organization_id"])
@ensure_UUID("organization_id")
def delete_user():
    organization_id = request.args.get("organization_id")
    user_id = auth.verify_id_token(request.headers.get("id_token"))["uid"]

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.delete_user(organization_id=UUID(organization_id),
                                                                user_id=user_id)
            response = jsonify({
                "status": "success",
                "organization": organization.get_JSON()
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@organizations_blueprint.route("/get_random_organizations", methods=["GET"])
def get_random_organizations():
    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        organizations = organizations_repository.get_random_organizations()
        response = jsonify({
            "status": "success",
            "organizations": [organization.get_JSON() for organization in organizations]
        })
        return response

@organizations_blueprint.route("/get_user_organizations", methods=["GET"])
@ensure_authorized()
def get_user_organizations():
    user_id = auth.verify_id_token(request.headers.get("id_token"))["uid"]

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        organizations = organizations_repository.get_user_organizations(user_id=user_id)
        response = jsonify({
            "status": "success",
            "organizations": [organization.get_JSON() for organization in organizations]
        })
        return response

