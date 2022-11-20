from flask import Blueprint, request, jsonify, make_response
from models.professor import Professor
from app import db
from auth.auth import authentication, admin_role

professorsapp = Blueprint('professors', __name__, template_folder='templates')

# Route to list all professors
@professorsapp.route('/professors', methods=['GET'])
@authentication
def get_professors(current_user):
    professors = Professor.query.all()
    return jsonify({'data': professors}), 200

# Route to create a new professor
@professorsapp.route('/professors/add', methods=['POST'])
@authentication
def create_professor(current_user):
    data = request.get_json()
    professor = Professor(age=data['age'], uuid=data['user_uuid'], belt=data['belt_color'])
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
    professor.belt = data['belt']
    professor.age = data['age']
    db.session.commit()
    return make_response(jsonify({'data': professor}, 200))
