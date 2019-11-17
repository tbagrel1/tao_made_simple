#!/usr/bin/env python3

import os

from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__, instance_path="/var/lib/tao_made_simple")
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    with app.app_context():
        from flask_cors import CORS
        cors = CORS(app)

        from src.api import api
        app.register_blueprint(api)

        from src.frontend import frontend
        app.register_blueprint(frontend)

    return app
