from datetime import datetime

from app import db

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship
from flask_login import UserMixin


class TestModel(db.Model):

    __tablename__ = 'test_models'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)


class User(UserMixin, db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))
    threads = relationship("Thread", back_populates="creator")
    responses = relationship("Response", back_populates="sender")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    @staticmethod
    def get_all():
        return User.query.all()

    @staticmethod
    def get(id):
        return User.query.get(id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "createdAt": self.created_at.isoformat(),
            "updatedAt": self.updated_at.isoformat()
        }

    @staticmethod
    def lookup(email=None, name=None):
        user1 = email and User.query.filter_by(email=email).first()
        user2 = name and User.query.filter_by(name=name).first()

        return user1 or user2

    @staticmethod
    def exists(email=None, name=None):
        return User.lookup(email=email, name=name) is not None


class UserAuth(db.Model):

    __tablename__ = 'users_auth'

    user_id = db.Column(db.Integer, ForeignKey(User.id), primary_key=True)
    password_hash = db.Column(db.String())
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    @staticmethod
    def get(id):
        return UserAuth.query.get(id)

    @staticmethod
    def get_by_user(user: User):
        return UserAuth.query.get(user.id)

    def save(self):
        db.session.add(self)
        db.session.commit()


class Thread(db.Model):

    __tablename__ = 'threads'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    creator_id = Column(Integer, ForeignKey('users.id'))
    creator = relationship("User", back_populates="threads")
    responses = relationship("Response", back_populates="receive_thread")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    @staticmethod
    def get_all():
        return Thread.query.all()

    @staticmethod
    def get(id):
        return Thread.query.get(id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        responses = map(lambda r: r.json(), self.responses)
        return {
            "id": self.id,
            "title": self.title,
            "creator": self.creator.json(),
            "responses": list(responses),
            "createdAt": self.created_at.isoformat(),
            "updatedAt": self.updated_at.isoformat()
        }

    @staticmethod
    def lookup(creator):
        thread = Thread.query.filter_by(creator=creator)
        return thread


class Response(db.Model):

    __tablename__ = 'responses'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    sender = relationship("User", back_populates="responses")
    receive_thread__id = Column(
        Integer, ForeignKey('threads.id'), nullable=False)
    receive_thread = relationship("Thread", back_populates="responses")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.now, onupdate=datetime.now)

    @staticmethod
    def get(id):
        return Response.query.get(id)

    @staticmethod
    def get_all():
        return Response.query.all()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {
            "id": self.id,
            "content": self.content,
            "sender": self.sender.json(),
            "receiveThreadId": self.receive_thread__id,
            "createdAt": self.created_at.isoformat(),
            "updatedAt": self.updated_at.isoformat()
        }

    @staticmethod
    def lookup(sender):
        response = Response.query.filter_by(sender=sender)
        return response
