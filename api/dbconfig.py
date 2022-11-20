from config import settings

class DBConfig():
    USER_DB = settings.USER_DB
    PASS_DB = settings.PASS_DB
    URL_DB = settings.URL_DB
    NAME_DB = settings.NAME_DB
    FULL_URL_DB = settings.FULL_URL_DB
    SQLALCHEMY_DATABASE_URI = settings.SQLALCHEMY_DATABASE_URI
    SECRET_KEY = settings.token
    DEBUG = settings.DEBUG
    BCRYPT_LOG_ROUNDS = settings.BCRYPT_LOG_ROUNDS
    SQLALCHEMY_TRACK_MODIFICATIONS = settings.SQLALCHEMY_TRACK_MODIFICATIONS