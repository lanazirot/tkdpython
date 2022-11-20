from database import db 
from belts import Belt

class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))
    belt = db.Column(db.Enum(Belt), nullable=False, default=Belt.WHITE, server_default=Belt.WHITE)
    age = db.Column(db.Integer, nullable=False)
    birth_date = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    next_belt_change = db.Column(db.DateTime, nullable=True)
    
    userModel = db.relationship("User", backref='user', cascade="all,delete", lazy="dynamic")