# ConfluenceLikeTree

```jsx
import React, { useState, useCallback, memo } from "react";

const initialTree = [
  {
    id: "1",
    title: "Getting Started",
    children: [
      { id: "1-1", title: "Introduction", children: [] },
      { id: "1-2", title: "Setup", children: [] },
    ],
  },
  {
    id: "2",
    title: "Guides",
    children: [
      {
        id: "2-1",
        title: "Frontend",
        children: [
          { id: "2-1-1", title: "React", children: [] },
          { id: "2-1-2", title: "Vue", children: [] },
        ],
      },
    ],
  },
];

const TreeNode = memo(function TreeNode({
  node,
  level,
  expandedIds,
  onToggle,
  onSelect,
  selectedId,
}) {
  const hasChildren = node.children?.length > 0;
  const expanded = expandedIds.has(node.id);

  return (
    <div>
      <div
        onClick={() => onSelect(node.id)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 8px",
          paddingLeft: `${level * 16 + 8}px`,
          cursor: "pointer",
          background: selectedId === node.id ? "#e6f0ff" : "transparent",
          borderRadius: "6px",
          userSelect: "none",
        }}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(node.id);
          }}
          style={{
            width: "20px",
            display: "inline-block",
            textAlign: "center",
            cursor: hasChildren ? "pointer" : "default",
          }}
        >
          {hasChildren ? (expanded ? "▾" : "▸") : ""}
        </span>

        <span>{node.title}</span>
      </div>

      {hasChildren &&
        expanded &&
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
            onSelect={onSelect}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
});

export default function ConfluenceLikeTree() {
  const [expandedIds, setExpandedIds] = useState(new Set([]));
  const [selectedId, setSelectedId] = useState(null);

  const onToggle = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div style={{ width: 320, fontFamily: "sans-serif" }}>
      <h3 style={{ marginBottom: 12 }}>Pages</h3>
      {initialTree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
          expandedIds={expandedIds}
          onToggle={onToggle}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}
```
