# `call`, `apply`, `bind` — Polyfill Implementation

```js
let car1 = {
  color: "Red",
  company: "Ferrari",
};

let car2 = {
  color: "Blue",
  company: "BMW",
};

let car3 = {
  color: "White",
  company: "Mercedes",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

/*
  The bind method binds the this value to the function and returns a new function.
  However, we still need to separately invoke the returned function.

  Fix 1: Use a Symbol key to avoid polluting the context object.
  Fix 2: Delete the temporary key after use.
  Fix 3: Merge preset args (...arg) with args passed at call time (...innerArg)
         so late-bound arguments work correctly.
*/

Function.prototype.myBind = function (currentContext = {}, ...arg) {
  if (typeof this !== "function") {
    throw new Error(this + " cannot be bound as it's not callable");
  }
  const fnSymbol = Symbol("fn");
  currentContext[fnSymbol] = this;
  return function (...innerArg) {
    const result = currentContext[fnSymbol](...arg, ...innerArg);
    delete currentContext[fnSymbol];
    return result;
  };
};

/*
  The apply method binds the this value to the function and executes the function.
  It takes the this value and a single array as parameters.

  Fix 1: Use a Symbol key to avoid polluting the context object.
  Fix 2: Delete the temporary key after use.
  Fix 3: Return the result of the function call.
*/

Function.prototype.myApply = function (currentContext = {}, arg = []) {
  if (typeof this !== "function") {
    throw new Error(this + " it's not callable");
  }
  if (!Array.isArray(arg)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }
  const fnSymbol = Symbol("fn");
  currentContext[fnSymbol] = this;
  const result = currentContext[fnSymbol](...arg);
  delete currentContext[fnSymbol];
  return result;
};

/*
  The call method binds the this value to the function and executes the function.
  It takes the this value and a list of arguments as parameters.

  Fix 1: Use a Symbol key to avoid polluting the context object.
  Fix 2: Delete the temporary key after use.
  Fix 3: Return the result of the function call.
*/

Function.prototype.myCall = function (currentContext = {}, ...arg) {
  if (typeof this !== "function") {
    throw new Error(this + " it's not callable");
  }
  const fnSymbol = Symbol("fn");
  currentContext[fnSymbol] = this;
  const result = currentContext[fnSymbol](...arg);
  delete currentContext[fnSymbol];
  return result;
};

const initPurchaseBmw = purchaseCar.myBind(car1, "₹", "1,00,00,000");
initPurchaseBmw();
// Output: I have purchased Red - Ferrari car for ₹1,00,00,000

purchaseCar.myApply(car2, ["₹", "50,00,000"]);
// Output: I have purchased Blue - BMW car for ₹50,00,000

purchaseCar.myCall(car3, "₹", "60,00,000");
// Output: I have purchased White - Mercedes car for ₹60,00,000

// Summary

/**
 * call  : binds the this value, invokes the function immediately, pass args as a list.
 * apply : binds the this value, invokes the function immediately, pass args as an array.
 * bind  : binds the this value, returns a NEW function, pass args as a list (can also pass more args later).
 */
```

---

## What Was Fixed

| Issue | Original Code | Fixed Code |
|---|---|---|
| `myBind` ignores args passed at call time | `return function () { ... }` | `return function (...innerArg) { ...(arg, ...innerArg) }` |
| `myApply` doesn't return result | `currentContext.fn(...arg)` | `return result` after storing it |
| `myCall` doesn't return result | `currentContext.fn(...arg)` | `return result` after storing it |
| Context object gets polluted with `fn` key | `currentContext.fn = this` | `Symbol("fn")` key + `delete` after use |
