from database import db 


class Judge(db.Model):
    __tablename__ = "judges"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_uuid = db.Column(db.Integer, db.ForeignKey('users.id'))