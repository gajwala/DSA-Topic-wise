# React Class Component Lifecycles

> Order of execution, purpose of each method, and examples. Use **function components + hooks** for new code; this is for understanding legacy code and interviews.

---

## 1. Lifecycle phases and order

Class components have three phases. Methods run in this order:

### Mounting (component created and inserted into DOM)

| Order | Method | When it runs |
|-------|--------|----------------|
| 1 | `constructor(props)` | First: set initial state, bind methods |
| 2 | `static getDerivedStateFromProps(props, state)` | Before first render (and every update) |
| 3 | `render()` | Builds JSX (must be pure) |
| 4 | `componentDidMount()` | After first render; DOM is ready; run effects, subscriptions, fetch |

### Updating (props or state changed)

| Order | Method | When it runs |
|-------|--------|----------------|
| 1 | `static getDerivedStateFromProps(props, state)` | Before render (on every update) |
| 2 | `shouldComponentUpdate(nextProps, nextState)` | Before render; return `false` to skip render (and all following update methods) |
| 3 | `render()` | Re-render |
| 4 | `getSnapshotBeforeUpdate(prevProps, prevState)` | After render, before DOM/refs are updated |
| 5 | `componentDidUpdate(prevProps, prevState, snapshot)` | After commit; DOM updated; run effects for update |

### Unmounting (component removed from DOM)

| Order | Method | When it runs |
|-------|--------|----------------|
| 1 | `componentWillUnmount()` | Right before component is removed; cleanup (subscriptions, timers, listeners) |

---

## 2. Visual order (flow)

```
MOUNT
  constructor
    → getDerivedStateFromProps
      → render
        → componentDidMount

UPDATE (props/state change)
  getDerivedStateFromProps
    → shouldComponentUpdate (false → stop; true → continue)
      → render
        → getSnapshotBeforeUpdate
          → componentDidUpdate

UNMOUNT
  componentWillUnmount
```

---

## 3. Method details and examples

### constructor(props)

- **Runs:** Once, when the instance is created.
- **Use:** Initialize `this.state`, bind event handlers. Do not call `setState` here.
- **Must:** Call `super(props)` before using `this`.

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState((s) => ({ count: s.count + 1 }));
  }
  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>;
  }
}
```

---

### static getDerivedStateFromProps(props, state)

- **Runs:** Before every render (mount and update).
- **Use:** Derive state from props (e.g. reset local state when a prop id changes). Return an object to update state, or `null` for no change.
- **Rare:** Prefer derived state during render or `useEffect` in function components.

```javascript
class Form extends React.Component {
  state = { value: '' };

  static getDerivedStateFromProps(props, state) {
    if (props.initialValue !== state.prevInitial) {
      return { value: props.initialValue, prevInitial: props.initialValue };
    }
    return null;
  }

  render() {
    return <input value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />;
  }
}
```

---

### render()

- **Runs:** On mount and every update (unless `shouldComponentUpdate` returns false).
- **Must:** Be pure (no side effects). Return JSX, `null`, or portal.

```javascript
render() {
  const { name } = this.props;
  const { count } = this.state;
  return (
    <div>
      <h1>{name}</h1>
      <p>Count: {count}</p>
    </div>
  );
}
```

---

### componentDidMount()

- **Runs:** Once, after the first render; DOM and refs are available.
- **Use:** Side effects: fetch, subscriptions, timers, DOM measurements, third-party libs.

```javascript
class DataList extends React.Component {
  state = { items: [], loading: true };

  componentDidMount() {
    fetch('/api/items')
      .then((res) => res.json())
      .then((items) => this.setState({ items, loading: false }));

    this.subscription = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return <ul>{this.state.items.map((i) => <li key={i.id}>{i.name}</li>)}</ul>;
  }
}
```

---

### shouldComponentUpdate(nextProps, nextState)

- **Runs:** Before render on every update (not on mount).
- **Return:** `true` (default) to allow render and later lifecycle; `false` to skip render and `getSnapshotBeforeUpdate` / `componentDidUpdate`.
- **Use:** Performance optimization (like `React.memo` for classes).

```javascript
shouldComponentUpdate(nextProps, nextState) {
  if (this.props.id === nextProps.id && this.state.count === nextState.count) {
    return false;
  }
  return true;
}
```

---

### getSnapshotBeforeUpdate(prevProps, prevState)

- **Runs:** After render, before React applies changes to the DOM (e.g. before scroll position is updated).
- **Return:** A value (or `null`) passed as the third argument to `componentDidUpdate`.
- **Use:** Capture DOM info (e.g. scroll position) before it changes, then restore in `componentDidUpdate`.

```javascript
class ScrollList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.items.length < this.props.items.length) {
      const list = this.listRef.current;
      return list ? list.scrollHeight - list.scrollTop : null;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null && this.listRef.current) {
      this.listRef.current.scrollTop = this.listRef.current.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef} style={{ overflow: 'auto', height: 300 }}>
        {this.props.items.map((i) => <div key={i.id}>{i.text}</div>)}
      </div>
    );
  }
}
```

---

### componentDidUpdate(prevProps, prevState, snapshot)

- **Runs:** After update is committed; DOM and refs are updated.
- **Use:** Side effects that depend on new props/state (e.g. fetch when `id` changes). Guard with `if (prevProps.id !== this.props.id)` to avoid infinite loops.
- **Third arg:** Value returned from `getSnapshotBeforeUpdate`.

```javascript
componentDidUpdate(prevProps, prevState, snapshot) {
  if (prevProps.userId !== this.props.userId) {
    this.fetchUser(this.props.userId);
  }
}
```

---

### componentWillUnmount()

- **Runs:** Once, right before the component is removed from the DOM.
- **Use:** Cleanup: clear timers, cancel subscriptions, remove listeners, abort fetches.

```javascript
componentDidMount() {
  this.timerId = setInterval(() => this.tick(), 1000);
}

componentWillUnmount() {
  clearInterval(this.timerId);
}
```

---

## 4. Deprecated / legacy methods (avoid)

| Method | Status | Instead use |
|--------|--------|-------------|
| `componentWillMount` | Deprecated | `constructor` or `componentDidMount` |
| `componentWillReceiveProps` | Deprecated | `getDerivedStateFromProps` or compare in `componentDidUpdate` |
| `componentWillUpdate` | Deprecated | `getSnapshotBeforeUpdate` or `componentDidUpdate` |
| `UNSAFE_componentWillMount` | Legacy | Same as above |
| `UNSAFE_componentWillReceiveProps` | Legacy | `getDerivedStateFromProps` |
| `UNSAFE_componentWillUpdate` | Legacy | `getSnapshotBeforeUpdate` / `componentDidUpdate` |

---

## 5. Class lifecycle vs function + hooks

| Class lifecycle | Function component equivalent |
|-----------------|-------------------------------|
| `constructor` + `this.state` | `useState` |
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return () => { ... }; }, [])` |
| `getDerivedStateFromProps` | Derive in render or `useEffect` + `useState` |
| `shouldComponentUpdate` | `React.memo` or `useMemo` |
| `getSnapshotBeforeUpdate` + `componentDidUpdate` | `useLayoutEffect` (with care) |

---

## 6. Full example: mount → update → unmount

```javascript
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('2 (update). shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('4 (update). getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('5 (update). componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    console.log('3. render');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState((s) => ({ count: s.count + 1 }))}>+</button>
      </div>
    );
  }
}
```

**Mount:** 1 → 2 → 3 → 4  
**Update (click):** 2 → 3 → 4 (getSnapshot) → 5 (componentDidUpdate)  
**Unmount:** componentWillUnmount

---

## 7. Quick reference

- **Mount:** constructor → getDerivedStateFromProps → render → componentDidMount  
- **Update:** getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate  
- **Unmount:** componentWillUnmount  
- Prefer **function components + hooks** for new code; use this as reference for existing class components and interviews.
