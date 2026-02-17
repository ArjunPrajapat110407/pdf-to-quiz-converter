import React, { useState } from 'react';
import '../styles/Quiz.css';

function Quiz({ questions, title, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answered, setAnswered] = useState(false);

  const handleAnswerClick = (index) => {
    if (answered) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index
    });

    const correct = index === questions[currentQuestion].correctAnswer;
    if (correct) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers({});
    setAnswered(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>📝 {title}</h2>
        <button onClick={onBack} className="back-btn">← वापस जाएं</button>
      </div>

      {showScore ? (
        <div className="score-container">
          <div className="score-card">
            <h2>🎉 Quiz Complete!</h2>
            <p className="score-text">
              आपका स्कोर: <span className="score-number">{score}/{questions.length}</span>
            </p>
            <p className="percentage">
              {Math.round((score / questions.length) * 100)}% सही जवाब
            </p>
            <div className="button-group">
              <button onClick={handleRestart} className="restart-btn">
                📊 फिर से Quiz दें
              </button>
              <button onClick={onBack} className="back-btn">
                ← नया PDF Upload करें
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="question-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <p className="question-count">
            सवाल {currentQuestion + 1} का {questions.length}
          </p>

          <div className="question">
            <h3>{questions[currentQuestion].question}</h3>
          </div>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`option-btn ${
                  selectedAnswers[currentQuestion] === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${answered && index === questions[currentQuestion].correctAnswer ? 'correct' : ''}`}
                disabled={answered}
              >
                {String.fromCharCode(65 + index)}) {option}
              </button>
            ))}
          </div>

          {answered && (
            <div className="explanation">
              <p>✅ सही जवाब: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}</p>
            </div>
          )}

          <button 
            onClick={handleNext} 
            className="next-btn"
            disabled={!answered}
          >
            {currentQuestion === questions.length - 1 ? 'परिणाम देखें' : 'अगला सवाल'} →
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;