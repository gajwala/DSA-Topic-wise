```js

function isValidOrganization(pairings) {
    const adj = new Map();
    const allEmployees = new Set();
    const subordinates = new Set();

    for (const [sub, manager] of pairings) {
        if (!adj.has(manager)) adj.set(manager, []);
        adj.get(manager).push(sub);

        allEmployees.add(sub);
        allEmployees.add(manager);

        if (subordinates.has(sub)) return false;
        subordinates.add(sub);
    }

    const leaders = [...allEmployees].filter(emp => !subordinates.has(emp));
    if (leaders.length !== 1) return false;

    const root = leaders[0];
    const visited = new Set();
    const path = new Set();

    function hasCycle(node) {
        if (path.has(node)) return true;
        if (visited.has(node)) return false;

        visited.add(node);
        path.add(node);

        for (const report of adj.get(node) || []) {
            if (hasCycle(report)) return true;
        }

        path.delete(node);
        return false;
    }

    if (hasCycle(root)) return false;

    return visited.size === allEmployees.size;
}

```
