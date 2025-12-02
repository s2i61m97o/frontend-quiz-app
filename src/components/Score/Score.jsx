import "./score.scss";

export default function Score({
  userScore,
  quizData,
  quizTopic,
  topicColor,
  resetQuiz,
  numOfQuestions,
}) {
  return (
    <main>
      <h1 className="heading">
        Quiz completed <br />
        <span className="bold">You scored...</span>
      </h1>
      <div className="score-container">
        <div className="score-card">
          <div className="selected-topic">
            <img
              src={quizData[quizTopic].icon}
              className="icon"
              style={{ backgroundColor: topicColor }}
            />
            <p className="header-topic">{quizData[quizTopic].title}</p>
          </div>
          <h2 className="user-score">{userScore}</h2>
          <p className="sub-text">out of {numOfQuestions}</p>
        </div>
        <button onClick={resetQuiz}>Play Again</button>
      </div>
    </main>
  );
}
