'use strict';

var NUMBER_OF_TESTS = 8;

var operators = {
    add: true,
    subtract: true,
    divide: true,
    multiply: true
};

var tests = {
    areResolved: function () {
        for (var value of Object.values(tests)) {
            if (!value.resolved) {
                return false;
            }
        }
        return true;
    }
};

//exclude tests.areResolved method from iteration over tests.values
Object.defineProperty(tests, "areResolved", {
    enumerable: false
});
