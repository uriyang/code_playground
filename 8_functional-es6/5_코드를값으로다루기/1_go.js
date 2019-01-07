const log = console.log;

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
  ];

// # 코드를 값으로 다루어 표현력 높이기

// ## go
const add = (a, b) => a + b;

log(
  reduce(
    add, 
    map(p => p.price, 
      filter(p => p.price < 20000, products))));
console.clear();

const go = (...args) => {
  reduce((a, f) => f(a), args);
};

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log);