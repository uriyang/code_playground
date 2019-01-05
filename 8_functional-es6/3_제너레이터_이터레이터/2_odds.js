const log = console.log;

// ## odds
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
  // for (let i = 0; i < l; i++) {
  //   if (i % 2) yield i;
  // }
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
    if (a == l) return;
  }
}

let iter2 = odds(10);
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next());

// let iter3 = infinity();
// log(iter3.next());
// log(iter3.next());

// let iter4 = limit(10, iter2);
// log(iter4.next());
// log(iter4.next());

for (const a of odds(40)) log(a);