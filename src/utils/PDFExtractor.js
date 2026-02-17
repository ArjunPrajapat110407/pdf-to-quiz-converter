const pdf = require('pdf-parse');

/**
 * Extracts text from a PDF file and converts it into quiz questions.
 * @param {Buffer} pdfBuffer - The PDF file as a buffer.
 * @returns {Promise<string[]>} - A promise that resolves to an array of quiz questions.
 */
async function extractQuestionsFromPDF(pdfBuffer) {
    try {
        const data = await pdf(pdfBuffer);
        const text = data.text;

        // Simple logic to convert text into questions, modify as needed
        const questions = text.split('\n').map(line => {
            if (line.trim()) {
                return { question: line.trim() + '?', answer: '' }; // Adjust this logic for actual answers
            }
            return null;
        }).filter(q => q !== null);

        return questions;
    } catch (error) {
        console.error('Error extracting questions from PDF:', error);
        throw error;
    }
}

module.exports = { extractQuestionsFromPDF };