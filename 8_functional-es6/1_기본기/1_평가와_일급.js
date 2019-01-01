const log = console.log;

// 1. 평가와 일급

// # 평가 - 코드가 계산(Evaluation) 되어 값을 만드는 것
// # 일급
// - 값으로 다룰 수 있다.
// - 변수에 담을 수 있다.
// - 함수의 인자로 사용될 수 있다.
// - 함수의 결과로 사용될 수 있다.

const a = 10;
const add10 = a => a + 10;
const r = add10(a);
log(r);