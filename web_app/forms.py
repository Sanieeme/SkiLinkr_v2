from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField, SelectMultipleField, SelectField, DateField, DecimalField
from wtforms.validators import DataRequired, Length, Email, EqualTo, Optional

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=8, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    is_freelancer = BooleanField('Are you a freelancer?')
    # Fields for freelancers
    service = SelectField('Service', choices=[
        ('plumbing', 'plumbing'),
        ('welding', 'welding'),
        ('carpentry', 'carpentry'),
        ('electrician', 'electrician'),
        ('masonry', 'masonry'),
        ('painting', 'painting'),
        ('landscaping', 'landscaping'),
        ('roofing', 'roofing'),
        ('mechanic', 'mechanic')
    ], validators=[Optional()])
    hourly_rate = DecimalField('Hourly Rate', validators=[Optional()])
    availability = SelectField('Availability', choices=[
        ('morning', 'Morning (08:00 - 12:00)'),
        ('afternoon', 'Afternoon (12:00 - 16:00)'),
        ('evening', 'Evening (16:00 - 20:00)'),
        ('weekend', 'Weekend (All day)'),
        ('anytime', 'Anytime')], validators=[Optional()])
    experience = SelectField('Experience', choices=[
        ('none', 'None'), 
        ('junior', 'Junior'), 
        ('mid', 'Mid'), 
        ('senior', 'Senior')], validators=[Optional()])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

class ServiceForm(FlaskForm):
    category = SelectField('Catergory', choices=[
        ('plumbing', 'plumbing'),
        ('welding', 'welding'),
        ('carpentry', 'carpentry'),
        ('electrician', 'electrician'),
        ('masonry', 'masonry'),
        ('painting', 'painting'),
        ('landscaping', 'landscaping'),
        ('roofing', 'roofing'),
        ('mechanic', 'mechanic')
    ], validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    hourly_rate = DecimalField('Hourly Rate', validators=[DataRequired()])
    availability = SelectField('Availability', choices=[
        ('morning', 'Morning (08:00 - 12:00)'),
        ('afternoon', 'Afternoon (12:00 - 16:00)'),
        ('evening', 'Evening (16:00 - 20:00)'),
        ('weekend', 'Weekend (All day)'),
        ('anytime', 'Anytime')], validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')

class RequestForm(FlaskForm):
    title = StringField('Request Title', validators=[DataRequired()])
    description = TextAreaField('Request Description', validators=[DataRequired()])
    due_date = DateField('Due Date', format='%Y-%m-%d', validators=[DataRequired()])
    working_hours = SelectField('Working hours', choices=[
        ('1', 'Anytime'), 
        ('2', '08:00-12:00'), 
        ('3', '13:00-15:00'), 
        ('4','16:00-20:00'), 
        ('5','Other')],validators=[DataRequired()])
    budget = DecimalField('Budget', validators=[DataRequired()], places=2)
    submit = SubmitField('Submit')

class Filterform(FlaskForm):
    category = SelectField('Category', choices=[
        ('all', 'All'),  
        ('welding', 'Welding'), 
        ('plumbing', 'Plumbing'), 
        ('carpentry', 'Carpentry'),
        ('mechanic', 'Mechanic'), 
        ('electrician', 'Electrician'), 
        ('masonry', 'Masonry'), 
        ('painting', 'Painting'), 
        ('landscaping', 'Landscaping'), 
        ('roofing', 'Roofing')])
    
    availability = SelectField('Availability', choices=[
        ('anytime', 'Anytime'),
        ('morning', 'Morning (08:00 - 12:00)'),
        ('afternoon', 'Afternoon (12:00 - 16:00)'),
        ('evening', 'Evening (16:00 - 20:00)'),
        ('weekend', 'Weekend (All day)')])
    
    experience = SelectField('Experience', choices=[
        ('none', 'None'), 
        ('junior', 'Junior'), 
        ('mid', 'Mid'), 
        ('senior', 'Senior')])