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
@require_json_params(["title", "thumbnail", "description", "owner"])
def add_organization():
    context = request.get_json()

    name = context.get("name") if context.get("name") else None
    image = context.get("image") if context.get("image") else None
    description = context.get("description") if context.get("description") else None
    owner = auth.verify_id_token(request.headers.get("id_token"))["uid"]

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.add_organization(
                name=name,
                image=image,
                description=description,
                owner=owner
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
            organization = organizations_repository.get_organization(organization_id=organization_id)
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
            organization_id = organizations_repository.delete_organization(organization_id=organization_id)
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
@require_query_params(["organization_id"])
@ensure_UUID("organization_id")
def patch_organization():
    organization_id = request.args.get("organization_id")
    context = request.get_json()

    name = context.get("name") if context.get("name") else None
    image = context.get("image") if context.get("image") else None
    description = context.get("description") if context.get("description") else None

    with Session(engine) as session:
        organizations_repository = OrganizationsRepository(session)
        try:
            organization = organizations_repository.patch_organization(organization_id = organization_id,name=name,image=image,description=description)
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
            organization = organizations_repository.delete_user(organization_id=organization_id,
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
