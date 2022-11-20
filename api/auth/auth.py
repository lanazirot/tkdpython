from functools import wraps
from flask import request, jsonify, make_response
from models.user import User
import jwt
from config import settings


def token_required(f):
    """
    Funcion que confirma que el usuario tiene el token activo
    """
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return make_response(jsonify({'message': 'Token missing'}), 400)
        try:
            data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.filter_by(uuid=data['uuid']).first()
            if not current_user:
                return make_response(jsonify({'message': 'User not found'}), 400)
        except:
            return make_response(jsonify({'message': 'Invalid token'}), 400)
        return f(current_user, *args, **kwargs)
    return decorator