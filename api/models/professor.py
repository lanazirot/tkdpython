from database import db 
from belts import Belt

class Professor(db.Model):
    __tablename__ = "professors"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))
    belt = db.Column(db.Enum(Belt, values_callable= lambda obj: [e.value for e in obj]), nullable=False, 
                     default=Belt.WHITE.value, server_default=Belt.WHITE.value)
    age = db.Column(db.Integer, nullable=False)
    students = db.relationship("Student", backref='student', cascade="all,delete", lazy="dynamic")