from flask import Blueprint, request, jsonify, make_response
from models.student import Student
from models.user import User
from models.professor import Professor
from app import db
from auth.auth import authentication, admin_role

studentsapp = Blueprint('students', __name__, template_folder='templates')

# Route to list all students
@studentsapp.route('/students', methods=['GET'])
@authentication
def get_students(current_user):
    students = Student.query.all()
    return make_response(jsonify({'data': students}), 200)

# Route to get details of a professor
@studentsapp.route('/students/<int:id>', methods=['GET'])
@authentication
def get_student(current_user, id):
    student = Student.query.get(id)
    if student:
        return jsonify({'data': student}), 200
    return jsonify({'message': 'Professor not found'}), 404

# Route to create a new student
@studentsapp.route('/students/add', methods=['POST'])
@authentication
def create_student(current_user):
    data = request.get_json()
    # Search for the user
    user: User = User.query.filter_by(uuid=data['uuid']).first()
    print(data)
    if not user:
        return make_response(jsonify({'message': 'Cant create student because of user UUID not found'}), 400)
    
    if user.role != 'NA':
        return make_response(jsonify({'message': 'Cant create student because of user role'}), 400)
    
    user.role = 'S'
    student = Student(age=data['age'], belt=data['belt_color'], userModel = user, weight=data['weight'])
    
    # Search professor
    professor: Professor = Professor.query.filter_by(user_uuid=data['professorModel']['uuid']).first()
    if not professor:
        return jsonify({'message': 'Professor not found'}), 404
    
    student.professorModel = professor

    db.session.add(student)
    db.session.commit()
    return make_response(jsonify({'data': student}, 200))

# Route to delete a student
@studentsapp.route('/students/<int:id>', methods=['DELETE'])
@authentication
@admin_role
def delete_student(current_user, id):
    student = Student.query.get(id)
    if not student:
        return make_response(jsonify({'message': 'Student not found'}), 404)
    db.session.delete(student)
    db.session.commit()
    return make_response(jsonify({'message': 'Student deleted'}), 200)

# Route to update a student
@studentsapp.route('/students/<int:id>', methods=['PUT'])
@authentication
@admin_role
def update_student(current_user, id):
    student: Student = Student.query.get(id)
    if not student:
        return make_response(jsonify({'message': 'Student not found'}), 404)
    data = request.get_json()
    # Search professor by id
    professor: Professor = Professor.query.get(user_uuid=data['professorModel']['uuid'])
    if not professor:
        return make_response(jsonify({'message': 'Professor not found'}), 404)
    
    student.belt_color = data['belt_color']
    student.age = data['age']
    student.userModel.email = data['userModel']['email']
    student.userModel.name = data['userModel']['name']
    student.weight = data['weight']
    student.professorModel = professor
    
    db.session.commit()
    return make_response(jsonify({'data': student}, 200))

