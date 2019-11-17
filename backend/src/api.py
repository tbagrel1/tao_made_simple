from flask import Blueprint, jsonify
api = Blueprint("api", __name__, url_prefix="/api/")

deliveries = {
    "i12312": {
        "id": "i12312",
        "label": "A54C95MATH2020",
        "name": "Test d'entrée - Mathématiques (2020)",
        "openingTime": 157410679,
        "closingTime": 157413679,
        "testLabel": "EXAM2020MATHS",
        "testDuration": 3000,
        "testNbQuestions": 20
    },
    "i12672": {
        "id": "i12672",
        "label": "A54C95PHY2020",
        "name": "Test d'entrée - Physique (2020)",
        "openingTime": 157410679,
        "closingTime": 157413679,
        "testLabel": "EXAM2020PHY",
        "testDuration": 3000,
        "testNbQuestions": 12
    }
}

students = {
    "i889230": {
        "id": "i889230",
        "login": "tbagrel12",
        "firstname": "Thomas",
        "lastname": "BAGREL",
        "status": "disconnected",
        "deliveryStartingTime": None,
        "testQuestionNo": None
    },
    "i887230": {
        "id": "i887230",
        "login": "jdumas16",
        "firstname": "Julien",
        "lastname": "DUMAS",
        "status": "connected",
        "deliveryStartingTime": None,
        "testQuestionNo": None
    },
    "i813230": {
        "id": "i813230",
        "login": "acesari28",
        "firstname": "Alexandre",
        "lastname": "CESARI",
        "status": "inProgress",
        "deliveryStartingTime": 157410692,
        "testQuestionNo": 11
    },
    "i887239": {
        "id": "i887239",
        "login": "tadam56",
        "firstname": "Timothée",
        "lastname": "ADAM",
        "status": "finished",
        "deliveryStartingTime": 157410697,
        "testQuestionNo": None
    },
    "i887243": {
        "id": "i887243",
        "login": "sdasilva99",
        "firstname": "Sébastien",
        "lastname": "DA SILVA",
        "status": "error",
        "deliveryStartingTime": None,
        "testQuestionNo": None
    }
}

delivery_students = {
    "i12312": students,
    "i12672": students
}


@api.route("/delivery", methods=("GET",))
def get_deliveries():
    return jsonify([delivery for id, delivery in deliveries.items()])


@api.route("/delivery/<string:delivery_id>", methods=("GET",))
def get_delivery(delivery_id):
    return jsonify(deliveries[delivery_id])


@api.route("/delivery/<string:delivery_id>/student", methods=("GET",))
def get_delivery_students(delivery_id):
    return jsonify([student for id, student in delivery_students[delivery_id].items()])


@api.route("/delivery/<string:delivery_id>/student/<string:student_id>", methods=("GET",))
def get_delivery_student(delivery_id, student_id):
    return jsonify(delivery_students[delivery_id][student_id])
