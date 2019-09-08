#!/usr/bin/env python3

import os

from dotenv import dotenv_values
from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__, instance_path="/var/lib/tao_made_simple")
    app.config.from_mapping(**dotenv_values(dotenv_path="./env.env"))
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    with app.app_context():
        from flask_cors import CORS
        cors = CORS(app)

        from src.database import db
        from src.models.user import User
        from src.models.post import Post
        db.init_app(app)
        db.create_all()

        from src.api import api
        app.register_blueprint(api)

        from src.frontend import frontend
        app.register_blueprint(frontend)

    return app
