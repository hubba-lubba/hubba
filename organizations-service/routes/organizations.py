from flask import Blueprint, jsonify, request
from domains.repositories.user_repository import UserRepository
from domains.repositories.organizations_repository import OrganizationsRepository
from domains.repositories.repo_exceptions import IdMissingException
from config import VERSION
from engine import engine
from sqlalchemy.orm import Session
from domains.repositories.repo_exceptions import *
from flask_cors import CORS
from routes.utils import ensure_UUID, require_json_params, require_query_params, ensure_authorized

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
    owner = context.get("owner")

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
def delete_event():
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


@orgs_blueprint.route("/join_org", methods=["POST"])
@ensure_authorized()
@require_json_params(["org_id", "user_id"])
def join_org():
    org_id = request.get_json()["org_id"]
    user_id = request.get_json()["user_id"]

    if not org_id or not user_id:
        response = jsonify({
            "status": "error",
            "message": "valid org_id and user_id is required"
        })
        response.status_code = 400
        return response

    with Session(engine) as session:
        orgs_repository = OrganizationsRepository(session)
        user_repository = UserRepository(session)

        try:
            org = orgs_repository.get_organization(org_id=org_id)
            user = user_repository.get_user(user_id=user_id)

            if user in org.users:
                response = jsonify({
                    "status": "failure",
                    "message": "user with user_id {0} already exists in org {1}"
                                .format(user_id, org_id)
                    })
                response.status_code = 400
                return response

            org.users.append(user)
            response = jsonify({
                "status": "success",
                "org": org.get_JSON(),
                "users": list(map(lambda elem: elem.user_id, org.users))
            })
            return response
        except IdMissingException as e:
            response = jsonify({
                "status": "error",
                "message": str(e)
            })
            response.status_code = 404
            return response

@orgs_blueprint.route("/leave_org", methods=["DELETE"])
@ensure_authorized()
@require_json_params(["org_id", "user_id"])
def leave_org():
    org_id = request.get_json()["org_id"]
    user_id = request.get_json()["user_id"]

    if not org_id or not user_id:
        response = jsonify({
            "status": "error",
            "message": "valid org_id and user_id is required"
        })
        response.status_code = 400
        return response

    with Session(engine) as session:
        orgs_repository = OrganizationsRepository(session)
        user_repository = UserRepository(session)

        try:
            org = orgs_repository.get_organization(org_id=org_id)
            user = user_repository.get_user(user_id=user_id)

            if user not in org.users:
                response = jsonify({
                    "status": "failure",
                    "message": "user with user_id {0} doesn't exist in org {1}"
                                .format(user_id, org_id)
                    })
                response.status_code = 400
                return response

            org.users.remove(user)
            response = jsonify({
                "status": "success",
                "org": org.get_JSON(),
                "users": list(map(lambda elem: elem.user_id, org.users))
                )}
            response.status_code = 200
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
    owner = context.get("owner") if context.get("owner") else None

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
