import random

from flask import jsonify, request
from flask_login import login_user, login_required, current_user
from werkzeug.exceptions import BadRequestKeyError
from werkzeug.security import generate_password_hash, check_password_hash


from app import app, db
from app.models import TestModel, User, UserAuth, Thread, Response


@app.route('/')
def hello():
    print('hello called')
    model = TestModel(name=f"test{random.randint(0, 100)}")
    db.session.add(model)
    db.session.commit()
    text = map(lambda m: m.name, TestModel.query.all())
    return 'Hello, World!' + '\n' + ','.join(text)


@app.route('/signin', methods=["POST"])
def signin():
    bad_req = {
        "error": "invalid email or password",
        "success": False
    }

    try:
        email = request.form["email"]
        given_password = request.form["password"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    user = User.lookup(email=email)
    if not user:
        return jsonify(bad_req), 400

    password_hash = UserAuth.get_by_user(user).password_hash
    valid_password = check_password_hash(password_hash, given_password)

    if not valid_password:
        return jsonify(bad_req), 400

    login_user(user)
    return jsonify({"success": True, "user": user.json()})


@app.route('/user', methods=["GET"])
def get_user():
    users = User.get_all()
    return jsonify({"users": [u.json() for u in users]})


@app.route('/user/<id>', methods=['GET'])
def get_user_with_id(id):
    user = User.get(id)

    if not user:
        return jsonify({
            "success": False,
            "error": f"user with id {id} was not found"
        }), 404

    return jsonify({
        "user": user.json(), "success": True
    })


@app.route('/user', methods=["POST"])
def create_user():
    try:
        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]
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

    password_hash = generate_password_hash(password)
    user_auth = UserAuth(user_id=user.id, password_hash=password_hash)
    user_auth.save()

    return jsonify({"user": user.json(), "success": True}), 201


@app.route('/thread', methods=['GET'])
def get_thread():
    threads = Thread.get_all()
    return jsonify({"threads": [t.json() for t in threads]})


@app.route('/thread/<id>', methods=['GET'])
def get_thread_with_id(id):
    thread = Thread.get(id)

    if not thread:
        return jsonify({
            "success": False,
            "error": f"thread with id {id} was not found"
        }), 404

    return jsonify({
        "thread": thread.json(), "success": True
    })


@ app.route("/thread", methods=["POST"])
@login_required
def create_thread():
    try:
        title = request.form["title"]
        creator_id = request.form["creator"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    creator = User.get(creator_id)

    thread = Thread(title=title, creator=creator)
    thread.save()

    return jsonify({"thread": thread.json(), "success": True}), 201


@ app.route('/response', methods=['GET'])
def get_response():
    responses = Response.get_all()
    return jsonify({"responses": [t.json() for t in responses]})


@ app.route("/response", methods=["POST"])
@login_required
def create_response():
    try:
        content = request.form["content"]
        sender_id = request.form["sender"]
        receive_thread_id = request.form["receiveThread"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    sender = User.get(sender_id)

    response = Response(content=content, sender=sender,
                        receive_thread__id=receive_thread_id)
    response.save()

    return jsonify({"response": response.json(), "success": True}), 201
