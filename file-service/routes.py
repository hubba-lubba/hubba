from flask import Blueprint, jsonify
from google.cloud import storage
from google.oauth2 import service_account
import datetime
from authorization import ensure_authorized
import random
import string
from config import SERVICE_ACCOUNT
import json
from logger import LoggerFactory

logger_factory = LoggerFactory()
logger = logger_factory.get_logger()
blob_url_generator = Blueprint("blob_url_generator", __name__, url_prefix="/")

if SERVICE_ACCOUNT is None or not SERVICE_ACCOUNT:
    credentials = service_account.Credentials.from_service_account_file("./hubba-credentials.json")
else:
    logger.info("Using service account from environment variable")
    SA_json = json.loads(SERVICE_ACCOUNT)
    credentials = service_account.Credentials.from_service_account_info(SA_json)

storage_client = storage.Client(credentials=credentials)

@blob_url_generator.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "success"})

@blob_url_generator.route("/get_profile_picture_upload_url", methods=["GET"])
@ensure_authorized()
def get_profile_picture_upload_url():
    bucket_name = "hubba-profile-pictures"

    bucket = storage_client.bucket(bucket_name)
    random_32 = ''.join(random.choices(string.ascii_lowercase + string.digits, k=32))
    blob_name =  f"{random_32}.jpeg"
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=15),
        method="PUT",
        content_type="image/jpeg"
    )
    logger.info(f"Generated signed URL for {blob_name}")
    return jsonify({
        "status": "success",
        "url": url,
        "blob-url": f"https://storage.googleapis.com/hubba-profile-pictures/{blob_name}"})
