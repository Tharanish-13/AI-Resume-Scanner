from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "your-mongodb-atlas-uri")
client = MongoClient(MONGO_URI)
db = client.get_database("your_database_name")