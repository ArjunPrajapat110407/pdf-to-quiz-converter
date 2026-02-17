import React, { useState } from 'react';
import './App.css';
import PDFUploader from './components/PDFUploader';
import Quiz from './components/Quiz';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const handleQuizCreated = (extractedQuestions, title) => {
    setQuestions(extractedQuestions);
    setQuizTitle(title);
    setShowQuiz(true);
  };

  const handleBackToUpload = () => {
    setShowQuiz(false);
    setQuestions([]);
    setQuizTitle('');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📄 PDF to Quiz Converter</h1>
        <p>PDF files को automatically quiz में convert करें</p>
      </header>
      
      {!showQuiz ? (
        <PDFUploader onQuizCreated={handleQuizCreated} />
      ) : (
        <Quiz 
          questions={questions} 
          title={quizTitle}
          onBack={handleBackToUpload}
        />
      )}
    </div>
  );
}

export default App;