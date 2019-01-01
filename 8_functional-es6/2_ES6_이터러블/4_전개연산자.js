const log = console.log;

// ## 전개 연산자

const a = [1, 2];
// a[Symbol.iterator] = null;
const arr = [1, 2, 3];
const set =new Set([1, 2, 3]);
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

log([...a, ...[3, 4], ...arr, ...set, ...map]);