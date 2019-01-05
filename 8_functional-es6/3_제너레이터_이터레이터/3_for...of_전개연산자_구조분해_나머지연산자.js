const log = console.log;

// ## for of, 전개 연산자, 구조 분해, 나머지 연산자
// 2_ODDS
function *infinity(i = 0) {
  while (true) yield i++;
}
function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}
function *odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
    if (a == l) return;
  }
}


log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);