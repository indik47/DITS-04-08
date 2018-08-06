'use strict';

var NUMBER_OF_TESTS = 8;
var operators = {
    add: true,
    subtract: true,
    divide: true,
    multiply: true
};

var tests = {
    isResolved: function () {
        for (var value of Object.values(tests)) {
            if (!value.resolved) {
                return false;
            }
        }
        return true;
    }
};

//exclude tests.isResolved method from iteration over tests.values
Object.defineProperty(tests, "isResolved", {
    enumerable: false
});


/**
 * Returns random number
 * @param max - top value for generated numbers
 * @return {Number}
 */
var getNumber = function (max) {
    var result = (Math.random() * max).toFixed(0);
    return Number(result);
};

function getSelectedOperators() {
    var selectedOperators = [];
    for (var key in operators) {
        if (operators[key] === true) {
            selectedOperators.push(key);
        }
    }
    return selectedOperators;
}

/**
 *  Get the math operator
  * @return {string}
 */
var getOperator = function () {
    //filter only selected operators from Settings dropdown
    var selectedOperators = getSelectedOperators();
    //choose random operator
    var randomIndex = getNumber(selectedOperators.length - 1);
    return selectedOperators[randomIndex];
};

/**
 * Generate math expression for tests
 * @return {{value: string, result: number}} - value to user display, result for test checking
 */
var getTest = function () {
    var operator = getOperator();
    var number1 = Number(getNumber(10));
    var number2 = Number(getNumber(10));

    switch (operator){
        case 'add':
            return { value : `${number1} + ${number2} =`,
                     result: number1 + number2,
                     operator : operator
                    };
        case 'subtract':
            return { value : `${number1} - ${number2} =`,
                     result: number1 - number2,
                     operator : operator
            };
        case 'divide':
            while (number2 === 0) { number2 = Number(getNumber(10)); }             //resolves division by 0 case
            while ( (number1/number2).toString().length > 5 ) { number2++; }       //resolves 0.nnnnnnnnnnnn cases
            return { value : `${number1} / ${number2} =`,
                     result: number1 / number2,
                     operator : operator
            };
        case 'multiply':
            return { value : `${number1} * ${number2} =`,
                     result: number1 * number2,
                     operator : operator
            };
    }
};

/**
 * Makes HTML layout for one test
 * @return {HTMLSpanElement} - row element with all the children
 */
var makeRowLayout = function(){
    var rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    var columnDiv = document.createElement('div');
    columnDiv.className = 'column';
    var expressionSpan = document.createElement('span');
    expressionSpan.className = 'expression';
    var input = document.createElement('input');
    input.operatorName = 'text';
    var answerSpan = document.createElement('span');
    answerSpan.className = 'answer-eval';
    answerSpan.innerText = '-';

    rowDiv.appendChild(columnDiv);
    columnDiv.appendChild(expressionSpan);
    columnDiv.appendChild(input);
    columnDiv.appendChild(answerSpan);

    return rowDiv;
};

/**
 * Initialize page
 */
var initPage = function () {
    var parent = document.querySelector('.container.expressions');
    parent.innerHTML = '';
};

/**
 * Change operator
 * @param operatorName
 * @param val
 */
function changeOperator(operatorName, val) {
    operators[operatorName] = val;
}

/**
 * Shows end screen
 */
var showEndScreen = function (message) {
    var overlay = document.querySelector('div.end-screen');
    var text = document.querySelector('.end-screen__title');
    text.innerText = message;
    overlay.style.left = '0';
};

/**
 * Hides end screen
 */
var hideEndScreen = function () {
    var overlay = document.querySelector('div.end-screen');
    overlay.style.left = '-100%';
};

var clearTests = function (){
    Object.keys(tests).forEach( function(key) { delete tests[key]; });
}
/**
 * Starts new Test session
 */
function startNewTest() {
    initPage();
    clearTests();
    generateTests();
    highlightActiveInput();
}

var askToStartNewTest = function (message) {
    showEndScreen(message);
};

/**
 * Generates single test
 * @param id
 */
function generateSingleTest(id) {
    tests[id] = getTest();
    tests[id].resolved = false;
    var row = makeRowLayout();
    document.querySelector('.container.expressions').appendChild(row);

    var span = row.firstChild.firstChild;
    span.innerText = tests[id].value;
    span.dataset.id = id;
}

/**
 * Generates all tests on the page
 */
var generateTests = function () {
    for (var i = 0; i < NUMBER_OF_TESTS; i++) {
       generateSingleTest(i);
    }
};

/**
 * Remakes tests after settings changes
 * @param setting
 */
var onSettingsChange = function (setting) {
    var selectedOperators = getSelectedOperators();
    var expressionSpans = document.querySelectorAll('.expression');
    var answerSpans = document.querySelectorAll('.answer-eval');

    if ( setting === 'operatorRemoved' ) {
        replaceTestsForDisabledOperators();
    }

    if ( setting === 'operatorAdded' ) {
        replaceUnresolvedTests();
    }

    function replaceTestsForDisabledOperators() {
        Array.prototype.forEach.call(expressionSpans, span => {
            if (!selectedOperators.includes(tests[span.dataset.id].operator)) {
                var row = span.parentNode.parentNode;
                row.parentNode.removeChild(row);
                generateSingleTest(span.dataset.id);
            }
        })
    }
    function replaceUnresolvedTests() {
        var unresolvedTests = Array.prototype.filter.call(answerSpans, span => {
            return span.innerText !== `true`;
        });
        unresolvedTests.forEach(test => {
            var row = test.parentNode.parentNode;
            row.parentNode.removeChild(row);
            generateSingleTest(row.firstChild.firstChild.dataset.id);
        })
    }
};

initStartBtn();
initSettingsDropDown();
initCheckBtn();
startNewTest();





