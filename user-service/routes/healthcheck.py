from flask import Blueprint, jsonify, request
from flask_cors import CORS

healthcheck_blueprint = Blueprint('healthcheck', __name__, url_prefix="/")
CORS(healthcheck)

@healthcheck.route("/")
def readiness():
    return "Success"
