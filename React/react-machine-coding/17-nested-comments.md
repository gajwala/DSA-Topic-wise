# 17 – Nested Comments (Threaded)

## Problem

Build a **threaded comment** system: each comment can have replies; replies can have their own replies (nested). Support add reply at any level and optional edit/delete.

## Requirements

- **Structure:** Comment has id, author, text, createdAt, children (array of comments). Render nested (indented or nested UI).
- **Add reply:** “Reply” on a comment opens input (inline or below); submit adds a new child to that comment. Recursive: replies can have replies.
- **Display:** Recursive render: Comment component renders its children as Comment components with indent or nesting.
- **Optional:** Edit (inline), Delete (with confirm); expand/collapse long threads.

## Approach / Hints

- **Data:** `{ id, author, text, children: Comment[] }`. State at top: `comments: Comment[]`. Updating nested: immutable update – find path to comment by id, replace that node with new node (added child or edited text). Or normalize by id and parentId and build tree for render.
- **Add reply:** From parent, pass callback addReply(parentId, { author, text }). In root, find parent (recursive or by id if flat with parentId), create new comment with id, set children to [...parent.children, newComment], and replace parent in tree (immutable).
- **Recursive render:** Comment component receives comment, depth; renders author, text, Reply button; if comment.children.length, map to <Comment key=c.id comment={c} depth={depth+1} />.

## Component structure (suggestion)

- `CommentSection` – state comments (tree); addReply(rootId, payload) that does immutable tree update.
- `Comment` – comment, depth, onReply; render reply input when “Reply” clicked; map children to Comment.

## Solution

```jsx
import { useState } from 'react';

const initialComments = [
  { id: '1', author: 'Alice', text: 'First comment', children: [
    { id: '1-1', author: 'Bob', text: 'Reply to Alice', children: [
      { id: '1-1-1', author: 'Alice', text: 'Reply to Bob', children: [] },
    ]},
  ]},
  { id: '2', author: 'Carol', text: 'Second comment', children: [] },
];

function addReplyById(comments, parentId, newComment) {
  return comments.map((c) => {
    if (c.id === parentId) {
      return { ...c, children: [...c.children, { ...newComment, id: Date.now().toString(), children: [] }] };
    }
    return { ...c, children: addReplyById(c.children, parentId, newComment) };
  });
}

function Comment({ comment, depth, onReply }) {
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  const submit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, { author: replyAuthor || 'Anon', text: replyText });
    setReplyText('');
    setReplyAuthor('');
    setShowInput(false);
  };

  return (
    <div style={{ marginLeft: depth * 24, marginTop: 8, padding: 8, borderLeft: '2px solid #ccc' }}>
      <strong>{comment.author}</strong>: {comment.text}
      <button onClick={() => setShowInput((s) => !s)} style={{ marginLeft: 8 }}>Reply</button>
      {showInput && (
        <div style={{ marginTop: 8 }}>
          <input placeholder="Author" value={replyAuthor} onChange={(e) => setReplyAuthor(e.target.value)} />
          <input placeholder="Reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
          <button onClick={submit}>Submit</button>
        </div>
      )}
      {comment.children?.map((c) => (
        <Comment key={c.id} comment={c} depth={depth + 1} onReply={onReply} />
      ))}
    </div>
  );
}

function CommentSection() {
  const [comments, setComments] = useState(initialComments);

  const handleReply = (parentId, payload) => {
    setComments((prev) => addReplyById(prev, parentId, payload));
  };

  return (
    <div>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} depth={0} onReply={handleReply} />
      ))}
    </div>
  );
}

export default CommentSection;
```

## React concepts tested

- Recursive component and recursive data.
- Immutable update of nested structure.
- Controlled input for reply form.
