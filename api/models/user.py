import uuid
import datetime
import jwt
from database import db
from encrypt import bcrypt
from dbconfig import DBConfig
from dataclasses import dataclass
@dataclass
class User(db.Model):
    __tablename__ = "users"
    
    id: int
    uuid: str
    name: str
    email: str
    password: str
    admin: bool
    registered_on: datetime.datetime
    updated_at: datetime.datetime
    role: str
    img_url: str
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    img_url = db.Column(db.String(1000), nullable=True)
    registered_on = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    updated_at = db.Column(
        db.DateTime, default=datetime.datetime.utcnow(), onupdate=datetime.datetime.utcnow())
    role = db.Column(db.String(50), nullable=False, default='NA')

    def __init__(self, name, email, password, img_url = '', admin=False) -> None:
        self.email = email
        self.name = name
        self.admin = admin
        self.img_url = img_url
        self.password = bcrypt.generate_password_hash(
            password, DBConfig.BCRYPT_LOG_ROUNDS).decode('utf-8')
        self.uuid = str(uuid.uuid4())

    def auth(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def generate_token(self,uuid):
        return jwt.encode({'uuid': uuid, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=30, hours=1), 'iat': datetime.datetime.utcnow()}, DBConfig.SECRET_KEY, algorithm='HS256')
