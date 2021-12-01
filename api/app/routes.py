import random

from flask import jsonify

from app import app, db
from app.models import TestModel


@app.route('/')
def hello():
    print('hello called')
    model = TestModel(name=f"test{random.randint(0, 100)}")
    db.session.add(model)
    db.session.commit()
    text = map(lambda m: m.name, TestModel.query.all())
    return 'Hello, World!' + '\n' + ','.join(text)


@app.route('/thread', methods=['GET'])
def get_thread():
    sample_user = {
        'id': 1,
        'name': 'hoge',
    }

    sample_thread = {
        'id': 1,
        'title': 'sample thread',
        'user': sample_user,
    }

    return jsonify(sample_thread)
