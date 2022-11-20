from database import db 
from models.belts import Belt
from utils import tojson

class Professor(db.Model):
    __tablename__ = "professors"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))
    belt_color = db.Column(db.Enum(Belt, values_callable= lambda f :[str(member.value) for member in Belt]), default=Belt.BLACK.value, server_default=Belt.BLACK.value)
    age = db.Column(db.Integer, nullable=False)
    students = db.relationship("Student", backref='student', cascade="all,delete", lazy="dynamic")
    
    def __init__(self, belt, age) -> None:
        self.age = age
        self.belt = belt
    
    @property
    def json(self):
        return tojson(self, self.__class__)