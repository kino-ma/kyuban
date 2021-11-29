from app import app
from app.models import TestModel


@app.route('/')
def hello():
    print('hello called')
    return 'Hello, World!'
