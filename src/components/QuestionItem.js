import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  // Delete request
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => onDelete(id));
  }

  // Optimistically update state when dropdown changes
  function handleChange(event) {
    const updatedCorrectIndex = parseInt(event.target.value, 10);

    // Optimistically update the UI
    onUpdate({ ...question, correctIndex: updatedCorrectIndex });

    // Send PATCH request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion))
      .catch(() => {
        // Roll back the UI in case of an error
        onUpdate(question);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
