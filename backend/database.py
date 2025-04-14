from pymongo import MongoClient

# Use your actual MongoDB Atlas URI here
MONGO_URI = "mongodb+srv://restfulapi:STARK123@cluster0.edonv.mongodb.net/resume_scanner?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Select Database (explicitly named 'resume_scanner')
db = client["resume_scanner"]

# Select Collections
users_collection = db["users"]
resumes_collection = db["resumes"]

print("✅ Connected to MongoDB Atlas successfully!")
