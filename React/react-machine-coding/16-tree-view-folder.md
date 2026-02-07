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

## React concepts tested

- useState (Set or object for expanded).
- Recursive component (TreeNode renders TreeNode).
- Lifting state (toggle/select in parent).
