from flask import Blueprint, request, jsonify, make_response
from models.student import Student
from models.user import User
from app import db
from auth.auth import authentication, admin_role

studentsapp = Blueprint('students', __name__, template_folder='templates')

# Route to list all students
@studentsapp.route('/students', methods=['GET'])
@authentication
def get_students(current_user):
    students = Student.query.all()
    return jsonify({'data': students}), 200

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
    user: User = User.query.filter_by(uuid=data['userModel']['uuid']).first()
    user.role = 'E'
    student = Student(age=data['age'], belt=data['belt_color'], userModel = user, weight=data['weight'])
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
    
    student.belt_color = data['belt_color']
    student.age = data['age']
    student.userModel.email = data['userModel']['email']
    student.userModel.name = data['userModel']['name']
    student.weight = data['weight']
    
    db.session.commit()
    return make_response(jsonify({'data': student}, 200))

@studentsapp.route('/students/<int:id>/students', methods=['GET'])
@authentication
@admin_role
def getEstudiantes_profesor(current_user, id):
    professor = Student.query.get(id)
    if not professor:
        return make_response(jsonify({'message': 'Professor not found'}), 404)
    return make_response(jsonify({'data': professor.students}, 200))