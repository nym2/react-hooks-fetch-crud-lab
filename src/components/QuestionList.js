import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  // Function to delete question from state
  function handleDelete(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  // Function to update a question's correct answer in state
  function updateQuestion(updatedQuestion) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={updateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
