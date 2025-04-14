import fitz  # PyMuPDF for extracting text from PDFs
import os
from collections import Counter

# ✅ Define the upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")

# ✅ Define job roles and their keywords
JOB_ROLES = {
    "Data Scientist": ["machine learning", "deep learning", "python", "data analysis", "statistics"],
    "Software Engineer": ["javascript", "react", "node.js", "api", "web development"],
    "AI Engineer": ["artificial intelligence", "neural networks", "tensorflow", "pytorch"],
    "DevOps Engineer": ["docker", "kubernetes", "cloud computing", "ci/cd", "aws"],
    "Business Analyst": ["business analysis", "market research", "data visualization", "excel", "power bi"],
    "Problem Solver": ["problem solving"]
}

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file."""
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text("text")
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {str(e)}"

def calculate_match_score(resume_text):
    """Calculate match score between resume and predefined job roles."""
    scores = {}

    for role, keywords in JOB_ROLES.items():
        count = sum(resume_text.lower().count(word) for word in keywords)
        scores[role] = count

    # Sort job roles based on match score (highest first)
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    best_match = sorted_scores[0] if sorted_scores[0][1] > 0 else ("No Match", 0)
    
    return best_match, sorted_scores
