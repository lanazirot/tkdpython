from flask import Blueprint, request, jsonify, make_response
from models.professor import Professor
from models.student import Student
from models.user import User
from app import db
from auth.auth import authentication, admin_role

professorsapp = Blueprint('professors', __name__, template_folder='templates')

# Route to list all professors
@professorsapp.route('/professors', methods=['GET'])
@authentication
def get_professors(current_user):
    professors = Professor.query.all()
    return jsonify({'data': professors}), 200

# Route to get details of a professor
@professorsapp.route('/professors/<int:id>', methods=['GET'])
@authentication
def get_professor(current_user, id):
    professor = Professor.query.get(id)
    if professor:
        return jsonify({'data': professor}), 200
    return jsonify({'message': 'Professor not found'}), 404

# Route to create a new professor
@professorsapp.route('/professors/add', methods=['POST'])
@authentication
def create_professor(current_user):
    data = request.get_json()
    # Search for the user
    user: User = User.query.filter_by(uuid=data['userModel']['uuid']).first()
    user.role = 'P'
    professor = Professor(age=data['age'], belt=data['belt_color'], userModel = user)
    db.session.add(professor)
    db.session.commit()
    return make_response(jsonify({'data': professor}, 200))

# Route to delete a professor
@professorsapp.route('/professors/<int:id>', methods=['DELETE'])
@authentication
@admin_role
def delete_professor(current_user, id):
    professor = Professor.query.get(id)
    if not professor:
        return make_response(jsonify({'message': 'Professor not found'}), 404)
    db.session.delete(professor)
    db.session.commit()
    return make_response(jsonify({'message': 'Professor deleted'}), 200)

# Route to update a professor
@professorsapp.route('/professors/<int:id>', methods=['PUT'])
@authentication
@admin_role
def update_professor(current_user, id):
    professor = Professor.query.get(id)
    if not professor:
        return make_response(jsonify({'message': 'Professor not found'}), 404)
    data = request.get_json()
    print(data)
    professor.belt = data['belt_color']
    professor.age = data['age']
    professor.userModel.email = data['userModel']['email']
    professor.userModel.name = data['userModel']['name']
    db.session.commit()
    return make_response(jsonify({'data': professor}, 200))

@professorsapp.route('/professors/<int:id>/students', methods=['GET'])
@authentication
@admin_role
def getEstudiantes_profesor(current_user, id):
    professor: Professor = Professor.query.filter_by(id=id).first()
    students = Student.query.filter_by(professor_id=professor.id).all()
    if not professor:
        return make_response(jsonify({'message': 'Professor not found'}), 404)
    return  jsonify({'data': students}), 200


@professorsapp.route('/professors/norole', methods=['GET'])
@authentication
@admin_role
def get_users_with_no_role(current_user):
    users = Professor.query.join(User, Professor.user_uuid == User.uuid).all()
    if not users:
        return make_response(jsonify({'message': 'No users found'}), 404)
    return make_response(jsonify({'users': users}), 200)