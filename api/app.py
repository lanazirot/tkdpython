from flask import Flask
from dbconfig import DBConfig
from flask_cors import CORS
from dynaconf import FlaskDynaconf
from encrypt import bcrypt
from database import db

app = Flask(__name__)
app.config.from_object(DBConfig)

CORS(app)
FlaskDynaconf(app, settings_files=["settings.toml"])
bcrypt.init_app(app)
db.init_app(app)
