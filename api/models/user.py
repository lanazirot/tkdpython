import uuid
import datetime
import jwt
from database import db
from encrypt import bcrypt
from dbconfig import DBConfig
from models.roles import Roles


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    registered_on = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), onupdate=datetime.datetime.utcnow())
    role = db.Column(db.Enum(Roles, values_callable=lambda obj: [e.value for e in obj]), nullable=True)

    def __init__(self, name, email, password, admin=False) -> None:
        self.email = email
        self.name = name
        self.admin = admin
        self.password = bcrypt.generate_password_hash(
            password, DBConfig.BCRYPT_LOG_ROUNDS).decode('utf-8')
        self.uuid = str(uuid.uuid4())

    def auth(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def generate_token(self,uuid):
        return jwt.encode({'uuid': uuid, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=30, hours=1), 'iat': datetime.datetime.utcnow()}, DBConfig.SECRET_KEY, algorithm='HS256')
