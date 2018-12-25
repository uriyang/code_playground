function unsplat(fun) {
    return function() {
        return fun.call(null, _.toArray(arguments));
    }
}

var joinElements = unsplat(function(array) { return array.join(' ') });

console.log(joinElements(1, 2));
console.log(joinElements('-', '$', '/', '!', ':'));