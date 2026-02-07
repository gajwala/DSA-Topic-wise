# 16 – Tree View / Folder Structure

## Problem

Build a **tree view**: nested nodes (e.g. folders); each node has a label and optional children. Expand/collapse by clicking icon or label; optional selection (single or multi).

## Requirements

- **Data:** Recursive structure: `{ id, label, children?: TreeNode[] }`. Render recursively.
- **Expand/collapse:** Icon (chevron or +/-) toggles visibility of children. Default: all collapsed, or first level expanded.
- **Selection (optional):** Click row to select; highlight selected; optional callback onSelect(node).
- **Indentation:** Children indented (padding or margin) to show hierarchy.

## Approach / Hints

- **State:** `expandedIds: Set<string>` (or object id → boolean). Toggle: add/remove id on icon click.
- **Render:** Map over root nodes; for each node render TreeNode. TreeNode renders label + icon; if node.children and node.id in expandedIds, map children to TreeNode (recursive). Use same TreeNode component for root and nested.
- **Recursion:** TreeNode receives node, expandedIds, onToggle, level (for indent). onToggle(node.id) in parent updates expandedIds.
- **Selection:** `selectedId: string | null`; pass to TreeNode; onClick row sets selectedId; pass onSelect(node) up.

## Component structure (suggestion)

- `TreeView` – state expandedIds (and selectedId); map root nodes to `TreeNode`.
- `TreeNode` – node, level, expanded, onToggle; if expanded, map node.children to TreeNode.

## Solution

```jsx
import { useState } from 'react';

const tree = [
  { id: '1', label: 'Root', children: [
    { id: '1-1', label: 'Folder A', children: [
      { id: '1-1-1', label: 'File A1' },
      { id: '1-1-2', label: 'File A2' },
    ]},
    { id: '1-2', label: 'Folder B', children: [
      { id: '1-2-1', label: 'File B1' },
    ]},
  ]},
];

function TreeNode({ node, level, expandedIds, onToggle }) {
  const hasChildren = node.children?.length;
  const isExpanded = expandedIds.has(node.id);

  return (
    <div style={{ marginLeft: level * 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {hasChildren ? (
          <button onClick={() => onToggle(node.id)} style={{ padding: 0, border: 'none', background: 'none' }}>
            {isExpanded ? '▼' : '▶'}
          </button>
        ) : <span style={{ width: 16, display: 'inline-block' }} />}
        <span>{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
}

function TreeView() {
  const [expandedIds, setExpandedIds] = useState(new Set(['1']));

  const toggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} level={0} expandedIds={expandedIds} onToggle={toggle} />
      ))}
    </div>
  );
}

export default TreeView;
```

## React concepts tested

- useState (Set or object for expanded).
- Recursive component (TreeNode renders TreeNode).
- Lifting state (toggle/select in parent).
