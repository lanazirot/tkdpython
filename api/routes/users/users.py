from flask import Blueprint, request, jsonify, make_response, session
from models.user import User
from app import db
from auth.auth import authentication, admin_role

from config import settings


import cloudinary
import cloudinary.uploader
import cloudinary.api


usersapp = Blueprint('users', __name__, template_folder='templates')


cloudinary.config( 
  cloud_name = settings.CLOUD_NAME, 
  api_key = settings.API_KEY, 
  api_secret = settings.API_SECRET
)

# Route for /login to login a user
@usersapp.route('/login', methods=['POST'])
def login():
    authUser = request.authorization
    if not authUser or not authUser.username or not authUser.password:
        return make_response('Auth must be provided to login', 401, {'WWW-Authenticate': 'Basic realm="Basic auth required"'})
    user : User = User.query.filter_by(email=authUser.username).first()
    if user:
        # Check if the password is correct
        if user.auth(authUser.password):
            # Generate a token
            token = user.generate_token(user.uuid)
            session['token'] = token
            return make_response(jsonify({'token': token, 'logged_in': True}), 200)
    return make_response('Could not verify login', 401, {'WWW-Authenticate': 'Basic realm="Failed login"'})

@usersapp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        try:
            upload_result = cloudinary.uploader.upload(data['img_url'])
            newUser = User(name=data['name'], email=data['email'], password=data['password'], img_url=upload_result['secure_url'])
            db.session.add(newUser)
            db.session.commit()
            # Generate a token
            token = newUser.generate_token(newUser.uuid)
            return make_response(jsonify({'logged_in': True, 'token': token}), 201)
        except Exception as e:
            return make_response(jsonify({'message': 'An error occurred while creating the user'}), 500)
    return make_response(jsonify({'message': 'User already exists'}), 409)        

@usersapp.route('/deleteUser', methods=['GET'])
@authentication
@admin_role
def delete_user(current_user, id):
    user = User.query.get(id)
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)
    db.session.delete(user)
    db.session.commit()
    # Delete profile picture from cloudinary
    if user.img_url:
        cloudinary.uploader.destroy(user.img_url)
    return make_response(jsonify({'message': 'User deleted'}), 200)