"""Module will initialize the Flask application."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from flask_migrate import Migrate


db = SQLAlchemy()
 
def create_app():
    """Create a Flask application."""
    app = Flask(__name__)
    app.secret_key = 'secret_pass'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    db.init_app(app)
    migrate = Migrate(app, db)

    from .views import views
    app.register_blueprint(views, url_prefix="/")

    from .models import User, Service, Request
    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'views.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
        
    return app

def create_database(app):
    if not path.exists('web_app/' + 'users.db'):
        db.create_all()