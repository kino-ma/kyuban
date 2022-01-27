import random

from flask import jsonify, request
from flask_login import login_user, login_required, current_user
from werkzeug.exceptions import BadRequestKeyError
from werkzeug.security import generate_password_hash, check_password_hash


from app import app, db
from app.models import User, UserAuth, Thread, Response, Follow


@app.route('/')
def hello():
    print('hello called')
    return 'Hello, World!'


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

    login_user(user)

    return jsonify({"user": user.json(), "success": True}), 201


@app.route('/thread', methods=['GET'])
def get_thread():
    threads = Thread.get_all()
    return jsonify({"threads": [t.json() for t in reversed(threads)]})


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
        first_content = request.form["content"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    creator = current_user
    thread = Thread(title=title, creator=creator)
    thread.save()

    first_response = Response(
        sender=current_user, content=first_content, receive_thread__id=thread.id)
    first_response.save()

    thread = thread.get(thread.id)
    return jsonify({"thread": thread.json(), "success": True}), 201


@ app.route('/response/<id>', methods=['GET'])
def get_one_response(id):
    response = Response.get(id)
    return jsonify({"response": response.json(), "success": True})


@ app.route('/response', methods=['GET'])
def get_response():
    sender_id = request.args.get('sender')

    if sender_id:
        sender = User.get(sender_id)
        responses = Response.lookup(sender)
    else:
        responses = Response.get_all()
    return jsonify({"responses": [t.json_with_thread() for t in reversed(responses)]})


@ app.route("/response", methods=["POST"])
@login_required
def create_response():
    try:
        content = request.form["content"]
        receive_thread_id = request.form["receiveThread"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    sender = current_user
    response = Response(content=content, sender=sender,
                        receive_thread__id=receive_thread_id)
    response.save()

    return jsonify({"response": response.json(), "success": True}), 201


@app.route("/response/feed", methods=["GET"])
@login_required
def thread_feed():
    followees = current_user.followees()
    responses = Response.get_from_users(followees)

    return jsonify({
        "responses": [r.json_with_thread() for r in reversed(responses)]
    })


@ app.route("/follow/<target_id>", methods=["GET"])
@login_required
def show_follow(target_id):
    me = current_user.id
    you = target_id
    following = Follow.get(me, you)
    followed = Follow.get(you, me)

    return jsonify({"following": bool(following), "followed": bool(followed), "success": True})


@ app.route("/follow/<target_id>", methods=["POST"])
@login_required
def follow_someone(target_id):
    src = current_user.id

    dst_user = User.get(target_id)
    if not dst_user:
        return jsonify({
            "success": False,
            "error": f"user with id {target_id} was not found"
        }), 404

    if Follow.get(src, dst_user.id):
        return jsonify({
            "success": False,
            "error": "you have already followed user {dst_user.id}"
        }), 400

    follow = Follow(src_user_id=src, dst_user_id=dst_user.id)
    follow.save()

    return jsonify({"success": True}), 201


@ app.route("/follow/<target_id>", methods=["DELETE"])
@login_required
def unfollow_someone(target_id):
    src = current_user.id

    dst_user = User.get(target_id)
    if not dst_user:
        return jsonify({
            "success": False,
            "error": f"user with id {target_id} was not found"
        }), 404

    follow = Follow.get(src_user_id=src, dst_user_id=dst_user.id)

    if not follow:
        return jsonify({
            "success": False,
            "error": f"you do not follow user with id {target_id}"
        }), 404

    follow.delete()

    return jsonify({"success": True})
