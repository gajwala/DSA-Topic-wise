```js


const a=[1,2,3,4];
for(let i=0;i<a.length;i++){
  if(a[i]===3) break;
  console.log(a[i])
}

Array.prototype.breakableForeach = function (callback) {
  const BREAK = Symbol("break");

  try {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this, () => {
        throw BREAK;
      });
    }
  } catch (e) {
    if (e !== BREAK) throw e;
  }
};


a.breakableForeach((val, index, arr, breakFn) => {
  if (val === 3) breakFn();
  console.log(val);
});

```
