from flask import Blueprint, request, jsonify, make_response
from models.user import User
from app import db

usersapp = Blueprint('users', __name__, template_folder='templates')

# Route for /login to login a user
@usersapp.route('/login', methods=['POST'])
def login():
    authUser = request.authorization
    if not authUser or not authUser.username or not authUser.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
    user : User = User.query.filter_by(username=authUser.username).first()
    if user:
        # Check if the password is correct
        if user.auth(authUser.password):
            # Generate a token
            token = user.generate_token()
            db.session['token'] = token
            return make_response(jsonify({'token': token, 'logged_in': True}), 200)
    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

@usersapp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        newUser = User(data['name'], data['email'], data['password'])
        try:
            db.session.add(newUser)
            db.session.commit()
            return make_response(jsonify({'message': 'User created successfully'}), 201)
        except Exception as e:
            return make_response(jsonify({'message': 'An error occurred while creating the user'}), 500)
    return make_response(jsonify({'message': 'User already exists'}), 409)        
        