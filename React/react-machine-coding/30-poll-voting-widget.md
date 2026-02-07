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

## Solution

```jsx
import { useState } from 'react';

const initialPoll = {
  question: 'Best frontend framework?',
  options: [
    { id: 'a', label: 'React', votes: 3 },
    { id: 'b', label: 'Vue', votes: 2 },
    { id: 'c', label: 'Angular', votes: 1 },
  ],
};

function Poll() {
  const [options, setOptions] = useState(initialPoll.options);
  const [selectedId, setSelectedId] = useState(null);
  const [voted, setVoted] = useState(false);

  const total = options.reduce((s, o) => s + o.votes, 0);

  const vote = () => {
    if (!selectedId) return;
    setOptions((prev) =>
      prev.map((o) => (o.id === selectedId ? { ...o, votes: o.votes + 1 } : o))
    );
    setVoted(true);
  };

  if (voted) {
    const resultTotal = options.reduce((s, o) => s + o.votes, 0);
    return (
      <div>
        <h3>{initialPoll.question}</h3>
        <p>{resultTotal} votes</p>
        {options.map((o) => {
          const pct = resultTotal > 0 ? ((o.votes / resultTotal) * 100).toFixed(0) : 0;
          return (
            <div key={o.id} style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{o.label}</span>
                <span>{o.votes} ({pct}%)</span>
              </div>
              <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: pct + '%', height: '100%', background: 'blue', borderRadius: 4 }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h3>{initialPoll.question}</h3>
      {options.map((o) => (
        <label key={o.id} style={{ display: 'block', marginTop: 4 }}>
          <input
            type="radio"
            name="poll"
            checked={selectedId === o.id}
            onChange={() => setSelectedId(o.id)}
          />
          {o.label}
        </label>
      ))}
      <button onClick={vote} disabled={!selectedId} style={{ marginTop: 12 }}>Vote</button>
    </div>
  );
}

export default Poll;
```

## React concepts tested

- useState (options with votes, selectedId, voted).
- Conditional render (voting vs results).
- Derived percentage, immutable update (increment vote).
