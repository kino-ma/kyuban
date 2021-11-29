from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy()
db.init_app(app)
Migrate(app, db)

from app import routes, models # this line must be at the bottom