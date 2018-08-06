'use strict';

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
 * Starts new session of tests
 */
function startNewTest() {
    clearPage();
    clearTests();
    generateTests();
    highlightActiveInput();
}

/**
 * Initializes page
 */
var pageInit = function () {
    initStartBtn();
    initSettingsDropDown();
    initCheckBtn();
    startNewTest();
};

pageInit() ;






