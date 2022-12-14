from flask import Blueprint, request, jsonify, make_response, session, render_template, Response
from models.user import User
from models.student import Student
from models.professor import Professor
from app import db
from auth.auth import authentication, admin_role

from config import settings


import cloudinary
import cloudinary.uploader
import cloudinary.api
import pdfkit
import os
import base64

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
            return make_response(jsonify({'token': token, 'logged_in': True, 'current_user': user}), 200)
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

@usersapp.route('/profile', methods=['GET'])
@authentication
def get_profile(current_user, uuid):
    # Check if current user is the same as the user in the url
    if current_user.uuid != uuid:
        return make_response(jsonify({'message': 'Not authorized to view this profile'}), 401)
    user = User.query.get(uuid = uuid)
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)
    return make_response(jsonify({'user': user}), 200)

@usersapp.route('/profile/getMyData', methods=['GET'])
@authentication
def get_profile_data(current_user):
    user: User = User.query.filter_by(uuid = current_user.uuid).first()    
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)
    if user.admin == True:
        return make_response(jsonify({'data': user, 'information': 'Eres administrador del sistema.'}), 200)
    
    if user.role == 'NA':
        return make_response(jsonify({'information': 'Tu usuario aun no ha sido asignado.', 'data': None}), 200)
    
    if user.role == 'S':
        student = Student.query.filter_by(user_uuid = current_user.uuid).first()
        return make_response(jsonify({'data': student, 'information': 'Bienvenido a la seccion personal estudiante'}), 200)
    elif user.role == 'P':
        professor = Professor.query.filter_by(user_uuid = current_user.uuid).first()
        return make_response(jsonify({'data': professor, 'information': 'Seonsaengnim-eul hwan-yeonghabnida!'}), 200)
    
    return make_response(jsonify({'user': user}), 200)

@usersapp.route('/profile/generateMyCardPDF', methods=['GET'])
@authentication
def get_profile_card(current_user):
    user = User.query.get(current_user.id)
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)
    
    path = os.path.join('static', 'TKD.png')
    with open(path, 'rb') as logo:
        encoded_logo = base64.b64encode(logo.read()).decode()
    logo.close()
    
    out = render_template('ProfileCardPDF.html', user=user, logo=encoded_logo)
    # PDF options
    options = {
        "orientation": "portrait",
        "page-size": "A6",
        "margin-top": "1.0cm",
        "margin-right": "1.0cm",
        "margin-bottom": "1.0cm",
        "margin-left": "1.0cm",
        "encoding": "UTF-8",
        "enable-local-file-access": ""
    }
    
    
    configuration = pdfkit.configuration(wkhtmltopdf=settings.WKHTMLTOPDF_PATH)
    pdf = pdfkit.from_string(out, options=options, configuration=configuration, css= os.path.join('static', 'ProfileCard.css'))
    headers = {"Content-Disposition": "attachment;filename=TKDCard.pdf"}
    return Response(pdf, mimetype='application/pdf', headers=headers)

@usersapp.route('/profile/uploadImage', methods=['PUT'])
@authentication
def upload_profile_image(current_user):
    data = request.get_json()
    user = User.query.get(current_user.id)
    if not user:
        return make_response(jsonify({'message': 'User not found'}), 404)
    try:
        oldImgUrl = user.img_url
        # Delete old profile picture from cloudinary
        if oldImgUrl:
            cloudinary.uploader.destroy(oldImgUrl)
            
        upload_result = cloudinary.uploader.upload(data['img_url'])
        user.img_url = upload_result['secure_url']
        db.session.commit()
        return make_response(jsonify({'message': 'Image uploaded', 'img_url':upload_result['secure_url']}), 200)
    except Exception as e:
        return make_response(jsonify({'message': 'An error occurred while uploading the image'}), 500)
    
@usersapp.route('/norole', methods=['GET'])
@authentication
@admin_role
def get_users_with_no_role(current_user):
    users = User.query.filter_by(role="NA").all()
    if not users:
        return make_response(jsonify({'message': 'No users found'}), 404)
    return make_response(jsonify({'users': users}), 200)