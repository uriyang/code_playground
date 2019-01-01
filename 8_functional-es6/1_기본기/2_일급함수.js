const log = console.log;

// 2. 일급 함수

// # 일급 함수
// - 함수를 값으로 다룰 수 있다.
// - 조합성과 추상화의 도구

const add5 = a => a + 5;
log(add5);
log(add5(5));

const f1 = () => () => 1;
log(f1());

const f2 = f1();
log(f2);
log(f2());