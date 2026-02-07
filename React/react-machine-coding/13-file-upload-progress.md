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

## React concepts tested

- useState (list of file metadata + progress).
- useRef (file input), useEffect (intervals for progress, cleanup).
- File API (File, name, size).
