import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import PDFExtractor from '../utils/PDFExtractor';
import '../styles/PDFUploader.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PDFUploader({ onQuizCreated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('कृपया एक PDF file select करें');
      return;
    }

    setLoading(true);
    setError('');
    setFileName(file.name);

    try {
      const text = await PDFExtractor.extractTextFromPDF(file);
      const questions = PDFExtractor.extractQuestionsFromText(text);
      
      if (questions.length === 0) {
        setError('PDF से कोई सवाल नहीं मिले। कृपया एक अलग PDF try करें।');
      } else {
        onQuizCreated(questions, file.name.replace('.pdf', ''));
      }
    } catch (err) {
      setError('PDF को process करने में error आया: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-uploader-container">
      <div className="upload-box">
        <div className="upload-icon">📤</div>
        <h2>PDF File Upload करें</h2>
        <p>अपनी PDF file को यहाँ drag करें या click करें</p>
        
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={loading}
          className="file-input"
          id="pdf-input"
        />
        <label htmlFor="pdf-input" className="upload-label">
          {loading ? '⏳ Processing...' : '📁 Choose PDF File'}
        </label>

        {fileName && <p className="file-name">Selected: {fileName}</p>}
        {error && <div className="error-message">❌ {error}</div>}
      </div>

      <div className="info-box">
        <h3>कैसे काम करता है?</h3>
        <ul>
          <li>✅ PDF file upload करें</li>
          <li>✅ Questions automatically extract होंगे</li>
          <li>✅ Quiz mode में test दें</li>
          <li>✅ अपना score देखें</li>
        </ul>
      </div>
    </div>
  );
}

export default PDFUploader;