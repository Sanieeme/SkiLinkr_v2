from flask import Blueprint, render_template, request, redirect, url_for, flash
from .forms import *
from .models import *
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            flash('Welcome back', 'success')
            return redirect(url_for('views.home'))
        else:
            print(form.error)
            flash('Login Unsuccessful. Please check email and password', 'error')
    return render_template('login.html', form=form)

@views.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None:
            hashed_password = generate_password_hash(form.password.data, method='pbkdf2:sha256', salt_length=8)
            user = User(username=form.username.data, email=form.email.data, 
                password=hashed_password, is_freelancer=form.is_freelancer.data)
            if form.is_freelancer.data:
                user.service = form.service.data
                user.hourly_rate = form.hourly_rate.data
                user.availability = form.availability.data
                user.experience = form.experience.data
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created!', 'success')
            return redirect(url_for('views.login'))
        else:
            flash('Email address already exists', 'danger')
    return render_template('signup.html', form=form)

@views.route('/list_services', methods=['GET', 'POST'])
@login_required
def list_services():
    form = ServiceForm()
    if form.validate_on_submit():
        service = Service(catergory=form.category.data, 
                          title=form.title.data,
                          hourly_rate=form.hourly_rate.data,
                          availability=form.availability.data,
                          description=form.description.data, 
                          user_id=current_user.id)
        db.session.add(service)
        db.session.commit()
        flash('Your service has been listed!', 'success')
        return redirect(url_for('views.services'))
    return render_template('list_services.html', form=form)

@views.route('/services', methods=['GET', 'POST'])
@login_required
def services():
    freelancers = Service.query.all()
    return render_template("services.html", freelancers=freelancers)

@views.route('/request_service', methods=['GET', 'POST'])
@login_required
def request_service():
    form = RequestForm()
    if form.validate_on_submit():
        request = Request(
            title=form.title.data, 
            budget=form.budget.data, 
            due_date=form.due_date.data, 
            working_hours=form.working_hours.data, 
            description=form.description.data, 
            user_id=current_user.id)
        db.session.add(request)
        db.session.commit()
        flash('Your request has been posted!', 'success')
        return redirect(url_for('views.requests'))
    return render_template('request_service.html', form=form)

@views.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.home'))

@views.route('/requests')
@login_required
def requests():
    requests = Request.query.all()
    return render_template("requests.html", requests=requests)

@views.route('/freelancers', methods=['GET', 'POST'])
@login_required
def freelancers():
    filtered_list = []
    form = Filterform()
    freelancers = User.query.filter_by(is_freelancer=True).all()
    if form.validate_on_submit(): 
        print(f'{form.category.data} {form.availability.data} {form.experience.data}')
        for freelancer in freelancers:
            if form.category.data == 'all' or form.category.data == freelancer.service:
                if form.availability.data == 'anytime' or form.availability.data == freelancer.availablility:
                    if form.experience.data == 'none' or form.experience.data == freelancer.experience:
                        filtered_list.append(freelancer)
        return render_template('freelancers.html', freelancers=filtered_list, form=form)
    return render_template('freelancers.html', freelancers=freelancers, form=form)

@views.route('/about')
def about():
    return render_template("about.html")