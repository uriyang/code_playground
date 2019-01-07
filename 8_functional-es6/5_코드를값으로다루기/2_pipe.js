const log = console.log;

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
  ];

// # 코드를 값으로 다루어 표현력 높이기

// ## pipe
const pipe = () => {};

const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100);