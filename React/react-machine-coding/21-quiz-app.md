# 21 – Quiz App (MCQ)

## Problem

Build a **quiz** app: multiple-choice questions; one question at a time; Next/Previous; submit to see score (correct answers / total); optional timer per question or total.

## Requirements

- **Questions:** Array of `{ id, question, options: string[], correctIndex: number }`. Show one question at a time.
- **Display:** Question text; list of options (radio or buttons); user selects one. Show question number (e.g. 3 of 10).
- **Navigation:** Next (go to next question), Previous (go to previous). Disable Prev on first, Next on last (or show Submit on last).
- **Submit:** When quiz is done, show score: “You got X out of Y correct.” Optionally highlight correct/wrong per question in review.
- **Optional:** Shuffle options; timer; review mode (see all answers after submit).

## Approach / Hints

- **State:** `currentIndex: number`, `answers: Record<questionId, selectedOptionIndex>`. On option click, set answers with current question id and selected index.
- **Next/Prev:** setCurrentIndex(i ± 1). On last question, “Submit” instead of “Next”; on submit compute score: count questions where answers[q.id] === q.correctIndex.
- **Score view:** After submit, set state `submitted: true`; render score and optionally map questions to show correct/incorrect.

## Component structure (suggestion)

- `Quiz` – state currentIndex, answers, submitted; current question; options as buttons/radios; Next/Prev/Submit; result screen when submitted.
- Data: questions array in component or imported.

## Solution

```jsx
import { useState } from 'react';

const questions = [
  { id: 1, question: 'What is 2+2?', options: ['3', '4', '5'], correctIndex: 1 },
  { id: 2, question: 'Capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correctIndex: 2 },
  { id: 3, question: 'React is a?', options: ['library', 'framework', 'language'], correctIndex: 0 },
];

function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const q = questions[index];
  const selected = answers[q?.id];
  const isLast = index === questions.length - 1;

  const score = submitted
    ? questions.filter((qu) => answers[qu.id] === qu.correctIndex).length
    : 0;

  const next = () => {
    if (isLast) setSubmitted(true);
    else setIndex((i) => i + 1);
  };
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  if (submitted) {
    return (
      <div>
        <h2>Result</h2>
        <p>You got {score} out of {questions.length} correct.</p>
      </div>
    );
  }

  return (
    <div>
      <p>Question {index + 1} of {questions.length}</p>
      <h3>{q.question}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {q.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="q"
                checked={selected === i}
                onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={prev} disabled={index === 0}>Previous</button>
      <button onClick={next}>{isLast ? 'Submit' : 'Next'}</button>
    </div>
  );
}

export default Quiz;
```

## React concepts tested

- useState (index, answers object).
- Conditional render (question vs result).
- Derived score from answers and correctIndex.
