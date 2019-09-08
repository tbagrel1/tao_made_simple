from flask import Blueprint, render_template

frontend = Blueprint("frontend", __name__, url_prefix="/")


@frontend.route("/", methods=("GET",))
def serve_index():
    return render_template("index.html")
