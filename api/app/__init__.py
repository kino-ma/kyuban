from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager


app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app, supports_credentials=True)

db = SQLAlchemy()
db.init_app(app)
Migrate(app, db, render_as_batch=True)

# Session management
login_manager = LoginManager()
login_manager.login_view = 'signin'
login_manager.init_app(app)

from app import routes, models  # this line must be at the bottom

@login_manager.user_loader
def load_user(user_id):
    return models.User.get(int(user_id))
