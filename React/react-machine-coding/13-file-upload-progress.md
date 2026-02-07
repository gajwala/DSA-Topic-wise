# 13 – File Upload with Progress

## Problem

Build a **file upload** UI: user selects file(s), see list of chosen files with name/size, and a **progress bar** that simulates or shows upload progress. Support remove before upload and show success/error state.

## Requirements

- **Input:** File input (hidden) triggered by button or drop zone; accept single or multiple files.
- **List:** Show selected files with name, size (formatted), and a progress bar (0–100%). Optional: remove file from list before upload.
- **Progress:** Simulate progress (setInterval increasing %) or use XMLHttpRequest upload.onprogress if backend supports. On “complete”, show success (or error).
- **Upload:** Button to start upload; for mock, simulate delay and progress updates.

## Approach / Hints

- **State:** `files: Array<{ id, file, progress, status: 'pending'|'uploading'|'done'|'error' }>`. On input change, add File objects with progress 0, status pending.
- **Simulated progress:** For each file, setInterval every 100ms: progress += 10; when 100, clear interval and set status 'done'. Or single “upload all” that runs through files.
- **Real progress:** Use XMLHttpRequest or fetch with ReadableStream; for XHR, xhr.upload.onprogress event gives loaded/total; set progress = (loaded/total)*100.
- **Remove:** Filter out file by id from state before starting upload.

## Component structure (suggestion)

- `FileUpload` – state files; file input (ref or hidden); button to open input; map files to `FileItem` (name, size, progress bar, remove).
- `FileItem` – progress bar (width: progress%), status text, remove button.

## Solution

```jsx
import { useState, useRef } from 'react';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const formatSize = (bytes) => (bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB');

  const onSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const simulateUpload = (fileId) => {
    setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: 'uploading', progress: 0 } : f)));
    let p = 0;
    const timerId = setInterval(() => {
      p += 10;
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: Math.min(p, 100) } : f)));
      if (p >= 100) {
        clearInterval(timerId);
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: 'done', progress: 100 } : f)));
      }
    }, 100);
  };

  const remove = (id) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <input ref={inputRef} type="file" multiple onChange={onSelect} style={{ display: 'none' }} />
      <button onClick={() => inputRef.current?.click()}>Select files</button>
      <button onClick={() => files.filter((f) => f.status === 'pending').forEach((f) => simulateUpload(f.id))}>Upload all</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((f) => (
          <li key={f.id} style={{ marginTop: 8 }}>
            {f.name} ({formatSize(f.size)}) — {f.status} {f.status === 'uploading' && `${f.progress}%`}
            <div style={{ width: 200, height: 8, background: '#eee', borderRadius: 4 }}>
              <div style={{ width: f.progress + '%', height: '100%', background: 'green', borderRadius: 4 }} />
            </div>
            <button onClick={() => remove(f.id)}>Remove</button>
            {f.status === 'pending' && <button onClick={() => simulateUpload(f.id)}>Upload</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUpload;
```

## React concepts tested

- useState (list of file metadata + progress).
- useRef (file input), useEffect (intervals for progress, cleanup).
- File API (File, name, size).
