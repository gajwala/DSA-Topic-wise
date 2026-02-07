# useContext Hook

## Theory

- **Purpose:** Read a **React context** value inside a function component (or custom hook) without prop drilling.
- **Signature:** `const value = useContext(SomeContext);`
- **Returns:** The value from the nearest `SomeContext.Provider` above the component. If there is no provider, it returns the **default value** from `createContext(defaultValue)`.

### Context flow

1. `createContext(default)` – creates the context.
2. `<Context.Provider value={x}>` – supplies the value to the tree below.
3. `useContext(Context)` – consumes the value in any descendant.

---

## Examples

### Theme context

```javascript
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

### Auth context

```javascript
const AuthContext = createContext(null);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser, isLoggedIn: !!user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **Props** | Context avoids passing props through many layers; overuse can make data flow hard to follow. |
| **React 19 use()** | In React 19 you can do `use(Context)` instead of `useContext(Context)`; `use()` can be called conditionally (e.g. in `if`), so it’s more flexible for context. |
| **State libs** | Context is for “tree-wide” read; for frequent updates, consider splitting context or using a state library (e.g. Zustand) to avoid unnecessary re-renders. |

---

## Performance

- **All consumers re-render** when the provider’value` reference changes. So:
  - Prefer **multiple small contexts** (theme, auth, locale) instead of one huge context.
  - **Memoize** the value: `value={useMemo(() => ({ ... }), [deps])}`.
  - Or put state + dispatch in separate contexts so only components that need the changing part re-render.

---

## React 19

- **use(Context)** – Same as `useContext(Context)` but can be used **conditionally**. Prefer `use(Context)` when you need conditional consumption.
