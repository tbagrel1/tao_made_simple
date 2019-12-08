from flask import Blueprint
import requests
import os

TAO_SUPERVISION_ROOT_URL = os.environ["TAO_SUPERVISION_ROOT_URL"]

api = Blueprint("api", __name__, url_prefix="/api/")


def get_auth():
    return os.environ["TAO_SUPERVISION_USERNAME"], os.environ["TAO_SUPERVISION_PASSWORD"]


def make_supervision_url(target):
    return TAO_SUPERVISION_ROOT_URL + "/" + target


def get_data(*args, **kwargs):
    try:
        headers = {'Accept': "application/json"}
        response = requests.get(*args, auth=get_auth(), headers=headers, **kwargs)
        response.raise_for_status()
        json_content = response.json()
        if "errorMsg" in json_content:
            return "TAO returned an error: {}".format(json_content["errorMsg"]), 500
        return json_content["data"], 200
    except Exception as e:
        if isinstance(e, requests.exceptions.HTTPError) and e.response.status_code == 403:
            return "Wrong credentials", 403
        return "Unable to authenticate or make contact with TAO: {}".format(repr(e)), 500


@api.route("/delivery", methods=("GET",))
def get_deliveries():
    return get_data(make_supervision_url("delivery"))


@api.route("/delivery/<string:delivery_id>", methods=("GET",))
def get_delivery(delivery_id):
    return get_data(make_supervision_url("delivery?deliveryId={}".format(delivery_id)))


@api.route("/delivery/<string:delivery_id>/testTaker", methods=("GET",))
def get_delivery_test_takers(delivery_id):
    return get_data(make_supervision_url("testTaker?deliveryId={}".format(delivery_id)))


@api.route("/delivery/<string:delivery_id>/testTaker/<string:test_taker_id>", methods=("GET",))
def get_delivery_student(delivery_id, test_taker_id):
    return get_data(make_supervision_url("testTaker?deliveryId={}&testTakerId={}".format(delivery_id, test_taker_id)))
