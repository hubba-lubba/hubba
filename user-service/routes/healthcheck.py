from flask import Blueprint, jsonify, request
from flask_cors import CORS

healthcheck_blueprint = Blueprint('healthcheck', __name__, url_prefix="/")
CORS(healthcheck_blueprint)

@healthcheck_blueprint.route("/")
def readiness():
    return "Success"
