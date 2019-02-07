const log = console.log;

// ### 사용자 정의 이터러블을 통해 알아보기

const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i == 0 ? { done: true } : { value: i--, done: false }
            },
            [Symbol.iterator]() { return this; }
        }
    }
};

let iterator = iterable[Symbol.iterator]();
iterator.next();
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
for (const a of iterator) log(a);


const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
// iter2.next();
// log(iter2[Symbol.iterator]() === iter2);
// for (const a of arr2) log(a);
// for (const a of iter2) log(a);

for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');
let iter3 = all[Symbol.iterator]();
log(iter3.next());