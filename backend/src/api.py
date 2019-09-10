from flask import Blueprint, jsonify
from src.database import db
from src.models.user import User
from src.models.post import Post

api = Blueprint("api", __name__, url_prefix="/api/")


@api.route("/user", methods=("GET",))
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append({
            "id": user.id,
            "username": user.username
        })
    return jsonify(result)


@api.route("/post", methods=("GET",))
def get_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        result.append({
            "id": post.id,
            "title": post.title,
            "author": post.author.username
        })
    return jsonify(result)


# Testing only
@api.route("/insert-test-data", methods=("GET",))
def insert_test_data():
    User.query.delete()
    Post.query.delete()

    tbagrel1 = User(id=12, username="tbagrel1", email="tbagrel1@me.org")
    HikArrow = User(id=14, username="HikArrow", email="hik.w@joke.eu")
    SCRUM = Post(id=2, title="SCRUM", content="Nothing there yet.", author=tbagrel1)

    db.session.add(tbagrel1)
    db.session.add(HikArrow)
    db.session.add(SCRUM)
    db.session.commit()
    return "", 204


# Testing only
@api.route("/delete-test-data", methods=("GET",))
def delete_test_data():
    User.query.delete()
    Post.query.delete()
    db.session.commit()
    return "", 204

