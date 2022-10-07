from os import environ

DB_NAME = environ["MONGO_INITDB_DATABASE"]
DB_USER = environ["DB_USERNAME"]
DB_PASS = environ["DB_PASSWORD"]
DB_HOST = environ["DB_HOST"]
DB_PORT = environ["DB_PORT"]
FRONTEND_URL = environ["FRONTEND_URL"]
MONGO_URI = f"mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
SECRET_KEY = environ["FLASK_SECRET_KEY"]
