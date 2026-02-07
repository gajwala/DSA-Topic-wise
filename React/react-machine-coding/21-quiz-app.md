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

## React concepts tested

- useState (index, answers object).
- Conditional render (question vs result).
- Derived score from answers and correctIndex.
