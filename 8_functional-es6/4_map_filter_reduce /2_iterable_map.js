const log = console.log;

// ## 이터러블 프로토콜을 따른 map의 다형성

// #### 4-1에서 가져온 함수
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}
//

log([1, 2, 3].map(a => a + 1));
log(document.querySelectorAll('*'));

function *gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map(a => a * a, gen()))

let m = new Map();
m.set('a', 10);
m.set('b', 20);
// const it = m[Symbol.iterator]();
// log(it.next());

log(map(([k, a]) => [k, a * 2], m));