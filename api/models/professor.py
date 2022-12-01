from database import db 
from models.student import Student
from models.user import User
from dataclasses import dataclass
from typing import List
@dataclass
class Professor(db.Model):
    __tablename__ = "professors"
    
    id: int
    user_uuid: str
    belt_color: str
    age: int
    userModel: User
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.String(255), db.ForeignKey('users.uuid', ondelete='CASCADE'))
    belt_color = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    
    students = db.relationship("Student", backref='student', cascade="all,delete", lazy="dynamic")
    userModel = db.relationship("User", backref='user_professor', cascade="all,delete", passive_deletes=True)
    
    def __init__(self, age,belt, userModel) -> None:
        self.age = age
        self.belt_color = belt
        self.userModel = userModel
    