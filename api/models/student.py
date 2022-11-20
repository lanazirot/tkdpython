from database import db 
from models.belts import Belt

class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))
    belt_color = db.Column(db.Enum(Belt, values_callable=lambda obj: [e.value for e in obj]), default=Belt.WHITE.value, server_default=Belt.WHITE.value)
    age = db.Column(db.Integer, nullable=False)
    birth_date = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    next_belt_change = db.Column(db.DateTime, nullable=True)
    
    userModel = db.relationship("User", backref='user', cascade="all,delete")