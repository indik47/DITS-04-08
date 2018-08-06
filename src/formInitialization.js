'use strict';

var operators = {
    add: true,
    subtract: true,
    divide: true,
    multiply: true
};
var answers = [];
/**
 * Initialize page
 */
var initPage = function () {
    var parent = document.querySelector('.container.expressions');
    parent.innerHTML = '';
};

/**
 * 
 * @param operatorName
 * @param val
 */
function changeOperator(operatorName, val) {
    operators[operatorName] = val;
}

/**
 * Returns random number
 * @param max - top value for generated numbers
 * @return {Number}
 */
var getNumber = function (max) {
    var result = (Math.random() * max).toFixed(0);
    return Number(result);
};

/**
 *  Get the math operator
  * @return {string}
 */
var getOperator = function () {
    //filter selected operators from dropdown
    var selectedOperators = Object.keys(operators).filter( operator => operators[operator] === true );
    //chose random operator
    var randomIndex = getNumber(selectedOperators.length - 1);
    return selectedOperators[randomIndex];
};

/**
 * Generate math expression for tests
 * @return {{value: string, result: number}} - value to user display, result for test checking
 */
var getExpression = function () {
    var operator = getOperator();
    var number1 = getNumber(10);
    var number2 = getNumber(10);

    switch (operator){
        case 'add':
            return { value : `${number1} + ${number2} =`,
                     result: Number(number1) + Number(number2)
            };
        case 'subtract':
            return { value : `${number1} - ${number2} =`,
                     result: Number(number1) - Number(number2)
            };
        case 'divide':
            return { value : `${number1} / ${number2} =`,
                     result: Number(number1) / Number(number2)
            };
        case 'multiply':
            return { value : `${number1} * ${number2} =`,
                     result: Number(number1) * Number(number2)
            };
    }
};

// /**
//  * Fill out the tests and answers for them
//  */
// var generateExpression = function (span){
//         var expression = getExpression();
//         answers.push(expression.result);
//         span.innerText = expression.value;
// };

var initForm = function(){
    var parent = document.querySelector('.container.expressions');
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

    parent.appendChild(rowDiv);
    rowDiv.appendChild(columnDiv);
    columnDiv.appendChild(expressionSpan);
    columnDiv.appendChild(input);
    columnDiv.appendChild(answerSpan);

    return expressionSpan;
};

var showEndScreen = function () {
    var overlay = document.querySelector('div.end-screen');
    overlay.style.left = '0';
};

var hideEndScreen = function () {
    var overlay = document.querySelector('div.end-screen');
    overlay.style.left = '-100%';
};


initDropDown();
initCheckBtn();
initStartBtn();




