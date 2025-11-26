import { useState } from "react";
import "./App.css";
import quizDataJSON from "../data.json";
import Header from "./components/Header/Header";
import StartMenu from "./components/StartMenu/StartMenu";

function App() {
  const quizData = quizDataJSON.quizzes;
  const quizTitleData = quizData.map((quiz) => {
    return { title: quiz.title, icon: quiz.icon };
  });

  const [colorTheme, setColorTheme] = useState("light");
  // const [quizTopic, setQuizTopic] = useState("");
  function toggleColorTheme() {
    setColorTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <>
      <Header
        colorTheme={colorTheme}
        toggleColorTheme={toggleColorTheme}
      />
      <StartMenu 
        quizTitleData={quizTitleData}
      />
    </>
  );
}

export default App;
