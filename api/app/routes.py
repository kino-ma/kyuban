import random

from flask import jsonify, request
from werkzeug.exceptions import BadRequestKeyError

from app import app, db
from app.models import TestModel, User, Thread


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
    threads = Thread.get_all()
    return jsonify({"threads": [t.json() for t in threads]})


###taketaketakeが書いたコード(Dec.20)
@app.route("/thread", methods=["POST"])
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
###taketaketakeが書いたコードここまで(Dec.20)








###taketaketakeが書いたコード(Dec.23)
@app.route('/response', methods=['GET'])
def get_response():
    responses = Response.get_all()
    return jsonify({"responses": [t.json() for t in responses]})


@app.route("/response", methods=["POST"])
def create_response():
    try:
        content = request.form["content"]
        sender = request.form["sender"]
        receive_thread = request.form["receive_thread"]
    except BadRequestKeyError as e:
        return jsonify({
            "error": "missing field(s): %s" % ','.join(["'%s'" % a for a in e.args]),
            "success": False
        }), 400

    response = Response(content=content, sender=sender, receive_thread=receive_thread)
    response.save()

    return jsonify({"response": response.json(), "success": True}), 201
###taketaketakeが書いたコードここまで(Dec.23)
