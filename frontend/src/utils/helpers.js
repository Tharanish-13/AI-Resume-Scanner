// Function to format date into a readable format
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to truncate text to a specific length
export const truncateText = (text, maxLength = 100) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

// Function to validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to format file size into KB or MB
export const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    else if (sizeInBytes < 1048576) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
};

// Function to extract file extension
export const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
};

// Function to check if a file is a valid resume format (PDF or DOCX)
export const isValidResumeFile = (fileName) => {
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    return allowedExtensions.includes(getFileExtension(fileName).toLowerCase());
};
