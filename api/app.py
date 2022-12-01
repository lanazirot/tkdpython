from flask import Flask
from dbconfig import DBConfig
from flask_cors import CORS
from dynaconf import FlaskDynaconf
from encrypt import bcrypt
from database import db
from flask_migrate import Migrate
from routes.users.users import usersapp
from routes.professors.professors import professorsapp
from routes.students.students import studentsapp

app = Flask(__name__)
app.config.from_object(DBConfig)
app.register_blueprint(usersapp)
app.register_blueprint(professorsapp)
app.register_blueprint(studentsapp)
CORS(app)
FlaskDynaconf(app, settings_files=["settings.toml"])
bcrypt.init_app(app)
db.init_app(app)
migrate = Migrate(app)
migrate.init_app(app, db)