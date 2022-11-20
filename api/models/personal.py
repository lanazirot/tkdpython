from database import db 
from dataclasses import dataclass
@dataclass
class Personal(db.Model):
    __tablename__ = "personnel"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))