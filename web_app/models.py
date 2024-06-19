from . import db
from flask_login import UserMixin



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_freelancer = db.Column(db.Boolean, default=False)
    # Fields for freelancers
    service = db.Column(db.String(100))
    hourly_rate = db.Column(db.Float)
    availability = db.Column(db.String(100))
    experience = db.Column(db.Text)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    catergory = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    hourly_rate = db.Column(db.Float, nullable=False)
    availability = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Service('{self.title}', '{self.user_id}')"

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100))
    date = db.Column(db.DateTime)
    description = db.Column(db.Text, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    working_hours = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Request('{self.title}', '{self.user_id}')"