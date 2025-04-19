import axios from 'axios';

const API_BASE_URL = 'https://ai-resume-scanner-1e01.onrender.com'; // Change this to your backend URL

// API instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to upload resume
export const uploadResume = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading resume:', error);
        throw error;
    }
};

// Function to fetch processed resumes
export const getResumes = async () => {
    try {
        const response = await api.get('/resumes');
        return response.data;
    } catch (error) {
        console.error('Error fetching resumes:', error);
        throw error;
    }
};

// Function to fetch resume details
export const getResumeDetails = async (id) => {
    try {
        const response = await api.get(`/resume/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resume details:', error);
        throw error;
    }
};

export default api;
