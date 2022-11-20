from database import db 
from models.belts import Belt
from utils import tojson
from models.student import Student

class Professor(db.Model):
    __tablename__ = "professors"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.String(255), db.ForeignKey('users.uuid'))
    belt_color = db.Column(db.Enum(Belt, values_callable=lambda obj: [e.value for e in obj]), default=Belt.BLACK.value, server_default=Belt.BLACK.value)
    age = db.Column(db.Integer, nullable=False)
    students = db.relationship("Student", backref='student', cascade="all,delete", lazy="dynamic")
    
    def __init__(self, age, uuid) -> None:
        self.age = age
        self.user_uuid = uuid
    
    @property
    def json(self):
        return tojson(self, self.__class__)