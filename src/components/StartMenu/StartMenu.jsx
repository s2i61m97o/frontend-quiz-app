import "./start-menu.scss";

export default function StartMenu({ quizTitleData, selectQuizTopic }) {
  function handleClick(e) {
    selectQuizTopic(e.currentTarget.value);
  }

  const quizTopicBtns = quizTitleData.map((quiz, index) => {
    return (
      <button key={quiz.title} className="topic" onClick={handleClick} value={index}>
        <img src={quiz.icon} className={quiz.title.toLowerCase() + " icon"} />
        {quiz.title}
      </button>
    );
  });

  return (
    <main>
      <h1 className="heading">
        Welcome to the <span className="bold">Frontend Quiz!</span>
      </h1>
      <p>Pick a subject to get started.</p>

      <div className="option-list">{quizTopicBtns}</div>
    </main>
  );
}
