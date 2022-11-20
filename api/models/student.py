from database import db 
from dataclasses import dataclass
import datetime
from models.user import User
@dataclass
class Student(db.Model):
    __tablename__ = "students"
    
    id: int
    user_uuid: str
    belt_color: str
    age: int
    birth_date: datetime.datetime
    weight: float
    professor_id: int
    next_belt_change: datetime.datetime
    userModel: User
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.String(255), db.ForeignKey('users.uuid'))
    belt_color = db.Column(db.String(50), nullable=False, default='Blanca')
    age = db.Column(db.Integer, nullable=False)
    birth_date = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    next_belt_change = db.Column(db.DateTime, nullable=True)
    
    userModel = db.relationship("User", backref='user_student', cascade="all,delete")
    