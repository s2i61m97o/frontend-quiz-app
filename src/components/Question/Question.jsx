import { useState, useEffect } from "react";
import "./question.scss";
import errorIcon from "/images/icon-error.svg";
import checkIcon from "/images/icon-correct.svg";

export default function Question({
  quizTopic,
  quizData,
  setUserScore,
  setQuizComplete,
}) {
  const [questionNum, setQuestionNum] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState(false);

  const answerOptions = ["A", "B", "C", "D"];
  const numOfQuestions = quizData[quizTopic].questions.length;

  useEffect(() => {
    setCorrectAnswer(quizData[quizTopic].questions[questionNum - 1].answer);
  }, [quizData, quizTopic, questionNum]);

  const optionBtns = quizData[quizTopic].questions[questionNum - 1].options.map(
    (option, index) => {
      return (
        <button
          key={option}
          className={setOptionsClassName(option)}
          type="radio"
          name="option"
          value={option}
          onClick={handleChange}
          disabled={answerSubmitted ? true : false}
        >
          <div className="optionChar">{answerOptions[index]}</div>
          {option}
          <img
            src={correctAnswer === option ? checkIcon : errorIcon}
            className={
              !answerSubmitted
                ? "hidden"
                : option === correctAnswer || option === userAnswer
                ? "answer-icon"
                : "hidden"
            }
          />
        </button>
      );
    }
  );

  function setOptionsClassName(option) {
    if (!answerSubmitted) {
      return option === userAnswer ? "selected option" : "option";
    } else {
      if (option === userAnswer) {
        return userAnswer === correctAnswer
          ? "correct option"
          : "incorrect option";
      }
      return "option";
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setUserAnswer(e.currentTarget.value);
    error && setError(false);
  }

  function submitAnswer() {
    setAnswerSubmitted(true);
    if (userAnswer === correctAnswer) {
      setUserScore((prev) => prev + 1);
    }
  }

  function getNextQuestion(e) {
    e.preventDefault();

    if (questionNum < 10) {
      setAnswerSubmitted(false);
      setUserAnswer("");
      setQuestionNum((prevNum) => prevNum + 1);
    } else {
      setQuizComplete(true);
    }
  }

  function showErr(e) {
    e.preventDefault();
    setError(true);
  }

  function showScore(e) {
    e.preventDefault();
    setQuizComplete(true);
  }

  return (
    <main>
      <p className="questionNum">Question {questionNum} of {numOfQuestions}</p>
      <h2 className="question">
        {quizData[quizTopic].questions[questionNum - 1].question}
      </h2>
      <progress min="1" max="10" value={questionNum}></progress>

      <form className="answer-options" action={userAnswer && submitAnswer}>
        {optionBtns}

        <button
          className={!userAnswer ? "disabled submit-btn" : "submit-btn"}
          type="submit"
          onClick={
            answerSubmitted
              ? questionNum === numOfQuestions
                ? showScore
                : getNextQuestion
              : userAnswer
              ? undefined
              : showErr
          }
        >
          {answerSubmitted
            ? questionNum === numOfQuestions
              ? "Complete Quiz"
              : "Next Question"
            : "Submit Answer"}
        </button>
      </form>
      <div className={error ? "error-msg" : "error-msg hidden"}>
        <img src={errorIcon} /> <p>Please select an answer</p>
      </div>
    </main>
  );
}
