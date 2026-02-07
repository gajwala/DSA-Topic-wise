# 30 – Poll / Voting Widget

## Problem

Build a **poll** widget: question and multiple options (radio); user selects one and submits (or selection is immediate). Show results as bar chart or percentage after vote; optional “already voted” state.

## Requirements

- **Poll:** Question text; 2–4 options (radio or buttons). User selects one.
- **Submit:** Button “Vote” or select = submit. After submit, disable options and show results.
- **Results:** Each option shows label + bar (width = percentage of total votes) + count or %. Mock: start with initial counts; on vote increment selected option’s count.
- **State:** Either “voting” (show options) or “voted” (show results). Optional: persist “already voted” in localStorage so refresh still shows results.
- **Optional:** Allow changing vote before submit; show “X people voted” or total.

## Approach / Hints

- **Data:** `question: string`, `options: Array<{ id, label, votes: number }>`. State: `selectedId: string | null`, `voted: boolean`. On submit: increment options.find(o => o.id === selectedId).votes; setVoted(true).
- **Results:** total = options.reduce((s, o) => s + o.votes, 0); each option percentage = (votes / total) * 100. Bar: div with width: `${percentage}%` and label + count.
- **Bar chart:** Outer div (full width); inner div (width %, background color); label overlay or beside.
- **Persistence:** After vote, localStorage.setItem('poll-voted', pollId); on load if voted, setVoted(true) and use stored counts or refetch.

## Component structure (suggestion)

- `Poll` – state options (with votes), selectedId, voted; question; if !voted render options + Vote button; if voted render results (bars + labels).
- `PollOption` – option; radio or button; disabled when voted. `PollResults` – options with bars.

## React concepts tested

- useState (options with votes, selectedId, voted).
- Conditional render (voting vs results).
- Derived percentage, immutable update (increment vote).
