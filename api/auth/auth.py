from functools import wraps
from flask import request, jsonify, make_response, session
from models.user import User
import jwt
from config import settings


def authentication(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return make_response(jsonify({'message': 'Token missing'}), 400)
        try:
            data = jwt.decode(token, settings.token, algorithms=["HS256"])
            current_user = User.query.filter_by(uuid=data['uuid']).first()
            if not current_user:
                return make_response(jsonify({'message': 'User not found'}), 400)
        except jwt.ExpiredSignatureError as es:
            print(es)
            return make_response(jsonify({'message': 'Expired token'}), 400)
        except jwt.InvalidTokenError as it:
            print(it)
            return make_response(jsonify({'message': 'Invalid token'}), 400)
        except Exception as ex:
            print(ex)
            return make_response(jsonify({'message': 'Internal server error'}), 500)
        return f(current_user, *args, **kwargs)
    return decorator



def admin_role(f):
    @wraps(f)
    # Check if current user is admin
    def decorator(*args, **kwargs):
        data = jwt.decode(session['token'], settings.SECRET_KEY, algorithms=["HS256"])
        current_user = User.query.filter_by(uuid=data['uuid']).first()
        if not current_user.admin:
            return make_response(jsonify({'message': 'Admin role required'}), 400)
        return f(current_user, *args, **kwargs)
    return decorator