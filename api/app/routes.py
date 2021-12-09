import random

from flask import jsonify, request
from werkzeug.exceptions import BadRequestKeyError

from app import app, db
from app.models import TestModel, User


@app.route('/')
def hello():
    print('hello called')
    model = TestModel(name=f"test{random.randint(0, 100)}")
    db.session.add(model)
    db.session.commit()
    text = map(lambda m: m.name, TestModel.query.all())
    return 'Hello, World!' + '\n' + ','.join(text)


@app.route('/user', methods=["GET"])
def get_user():
    users = User.get_all()
    return jsonify({"users": [u.json() for u in users]})


@app.route('/user', methods=["POST"])
def create_user():
    try:
        name = request.form["name"]
        email = request.form["email"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    if User.exists(email=email, name=name):
        return jsonify({
            "error": "name or email already used",
            "success": False,
        })

    user = User(name=name, email=email)
    user.save()

    return jsonify({"user": user.json(), "success": True}), 201

@app.route('/thread', methods=['GET'])
def get_thread():
    user1 = {
        'id': 1,
        'name': 'hoge',
    }
    user2 = {
        'id': 2,
        'name': 'fuga',
    }

    sample_responses = [
        {
            'id': 1,
            'threadId': 1,
            'user': user1,
            'content': "sample respnose",
        },
        {
            'id': 2,
            'threadId': 1,
            'user': user2,
            'content': "hello",
        },
        {
            'id': 3,
            'threadId': 1,
            'user': user1,
            'content': "aaaa",
        },
        {
            'id': 3,
            'threadId': 1,
            'user': user2,
            'content': "hello world",
        },
    ]

    sample_thread = {
        'id': 1,
        'title': 'sample thread',
        'user': user1,
        'responses': sample_responses
    }

    return jsonify(sample_thread)
