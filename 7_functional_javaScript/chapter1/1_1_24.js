function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    }
}

var addArrayElements = splat(function(x, y) { return x + y; });

const result = addArrayElements([1,2]);
console.log(result);

// apply() 메서드는 주어진 this값과 arguments로 함수를 호출합니다. arguments에는 배열(또는 유사배열객체 array-like object)가 올 수 있습니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply