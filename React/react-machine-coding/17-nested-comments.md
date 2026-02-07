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

## React concepts tested

- Recursive component and recursive data.
- Immutable update of nested structure.
- Controlled input for reply form.
