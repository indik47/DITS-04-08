'use strict';

var operators = {
    add: true,
    subtract: true,
    divide: true,
    multiply: true
};

var answers = [];

var generateNumber = function (max) {
    var result = (Math.random() * max).toFixed(0);
    return result;
};


var getOperator = function () {
    var trueOperators = Object.keys(operators).filter( operator => operators[operator] === true );
    var randomIndex = generateNumber(trueOperators.length - 1);
    return trueOperators[randomIndex];
};


var generateExpression = function () {
    var operator = getOperator();
    var number1 = generateNumber(10);
    var number2 = generateNumber(10);

    switch (operator){
        case 'add':
            return { value : `${number1} + ${number2}`,
                     result: Number(number1) + Number(number2)
            };
        case 'subtract':
            return { value : `${number1} - ${number2}`,
                result: number1 - number2
            };
        case 'divide':
            return { value : `${number1} / ${number2}`,
                result: number1 / number2
            };
        case 'multiply':
            return { value : `${number1} * ${number2}`,
                result: number1 * number2
            };
    }
};

var expressions = document.querySelectorAll(".expression");
expressions.forEach( span => {
    var expression = generateExpression();
    answers.push(expression.result);
    span.innerText = expression.value;
});

var checkBtn = document.querySelector(".btn.check");
    checkBtn.addEventListener('click', function () {

        var userInputs = document.querySelectorAll("input");
        var answerSpans = document.querySelectorAll(".answer-eval");
        console.log(answerSpans);

        userInputs.forEach( (input, index) => {
            if ( Number(input.value) === answers[index] ) {
                answerSpans[index].innerText = true;
            }
            else {
                answerSpans[index].innerText = false;
            }
        });
});


var dropDown = document.querySelector(".dropdown-content");

Array.prototype.forEach.call(dropDown.children, child => {
    child.addEventListener('click', function () {
        child.classList.toggle('selected');
        if ( child.classList.contains('selected') ) {
            changeOperator(child.dataset.value, true)
        } else
        {
            changeOperator(child.dataset.value, false)

        }
        console.log(operators);
    });
});

function changeOperator(type, val) {
    operators[type] = val;
}



