from database import db
from datetime import datetime
from encrypt import bcrypt
from dbconfig import DBConfig
import uuid
from models.roles import Roles
import jwt


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    registered_on = db.Column(
        db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)
    role = db.Column(db.Enum(Roles, values_callable=lambda obj: [
                     e.value for e in obj]), nullable=True)

    def __init__(self, name, email, password, admin=False) -> None:
        self.email = email
        self.name = name
        self.admin = admin
        self.password = bcrypt.generate_password_hash(
            password, DBConfig.BCRYPT_LOG_ROUNDS).decode('utf-8')
        self.uuid = str(uuid.uuid4())

    def auth(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def generate_token(uuid):
        return jwt.encode({'uuid': uuid, 'exp': datetime.utcnow() + datetime.timedelta(days=0, minutes=30, hours=1), 'iat': datetime.utcnow()}, DBConfig.SECRET_KEY, algorithm='HS256')
