'use strict';

/**
 * Initializes dropdown functionality to select/deselect math operators
 */
var initDropDown = function (){
    var dropDown = document.querySelector('.dropdown-content');

    Array.prototype.forEach.call(dropDown.children, child => {
        child.addEventListener('click', function () {
            child.classList.toggle('selected');
            //update operator
            child.classList.contains('selected') ? changeOperator(child.dataset.value, true) : changeOperator(child.dataset.value, false);
        });
    });
};

/**
 * Checks if test has been done correctly and initiates end screen
 * @param answersSummary {array} - true/false values for every user answer in the test
 */
function checkTest(answersSummary) {
    if (!answersSummary.includes(false)) {
        return true;
    }
    return false;
}

/**
 * Initializes Check button functionality
 */
var initCheckBtn = function () {
    var checkBtn = document.querySelector('.btn.check');

    checkBtn.addEventListener('click', function () {
        var userInputs = document.querySelectorAll('input');
        var answerSpans = document.querySelectorAll('.answer-eval');
        var answersSummary = [];

        userInputs.forEach( (input, index) => {
            if ( Number(input.value) === answers[index] && input.value !== '' ) {
                answerSpans[index].innerText = true;
                answerSpans[index].style.backgroundColor = '#3d8e71';
                answersSummary.push(true);
            }
            else {
                answerSpans[index].innerText = false;
                answerSpans[index].style.backgroundColor = '#984053';
                answersSummary.push(false);
            }
        });

        if ( checkTest(answersSummary) ) {
            showEndScreen();
        }
    });
};

/**
 * Make active input field highlighted
 */
var highlightActiveInput = function () {
    var inputs = document.querySelectorAll('input');
    Array.prototype.forEach.call(inputs, input => {
        input.addEventListener('focus', function () {
            this.style.backgroundColor = '#aabdb5';
        })
    });
    Array.prototype.forEach.call(inputs, input => {
        input.addEventListener('focusout', function () {
            this.removeAttribute('style');
        })
    });
};

function fillTests() {
        answers = [];

        for (var i = 0; i < 2; i++) {
            var expression = getExpression();
            var span = initForm();
            span.innerText = expression.value;
            answers.push(expression.result);
    }
}

function generateTests() {
    initPage();
    fillTests();
    highlightActiveInput();
}

/**
 * Initializes tests at Test button click
 */
var initStartBtn = function () {
    document.querySelector('.btn.start').addEventListener('click', function () {
        generateTests();
    });
};

//Start again button at end screen
document.querySelector('.btn.end-screen__start').addEventListener('click', function () {
    generateTests();
    hideEndScreen();
});

//Cancel again button at end screen
document.querySelector('.btn.end-screen__cancel').addEventListener('click', function () {
    hideEndScreen();
});




