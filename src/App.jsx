import { useState, useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import StartMenu from "./components/StartMenu/StartMenu";
import Question from "./components/Question/Question";
import Score from "./components/Score/Score";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [colorTheme, setColorTheme] = useState("light");
  const [quizTopic, setQuizTopic] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [topicColor, setTopicColor] = useState();
  const [numOfQuestions, setNumOfQuestions] = useState();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setQuizData(data.quizzes));
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = colorTheme;
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  const quizTitleData = quizData.map((quiz) => {
    return { title: quiz.title, icon: quiz.icon };
  });

  function toggleColorTheme() {
    setColorTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  function selectQuizTopic(topic) {
    setQuizTopic(topic);
    setTopicColor(() => {
      switch (topic) {
        case "0":
          return "#fff5ed";
        case "1":
          return "#e0fdef";
        case "2":
          return "#ebf0ff";
        case "3":
          return "#f6e7ff";
      }
    });
    setQuizLength(topic);
  }

  function setQuizLength(topic) {
    setNumOfQuestions(quizData[topic].questions.length);
  }

  function resetQuiz() {
    setQuizComplete(false);
    setQuizTopic(null);
    setUserScore(null);
    setNumOfQuestions(null);
  }

  return (
    <>
      <Header
        colorTheme={colorTheme}
        toggleColorTheme={toggleColorTheme}
        quizTopic={quizTopic}
        quizData={quizData}
        topicColor={topicColor}
      />
      {quizComplete ? (
        <Score
          userScore={userScore}
          quizData={quizData}
          quizTopic={quizTopic}
          topicColor={topicColor}
          resetQuiz={resetQuiz}
          numOfQuestions={numOfQuestions}
        />
      ) : quizTopic ? (
        <Question
          quizTopic={quizTopic}
          quizData={quizData}
          setUserScore={setUserScore}
          setQuizComplete={setQuizComplete}
          numOfQuestions={numOfQuestions}
        />
      ) : (
        <StartMenu
          quizTitleData={quizTitleData}
          selectQuizTopic={selectQuizTopic}
        />
      )}
    </>
  );
}

export default App;
