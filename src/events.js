'use strict';

/**
 * Initializes dropdown functionality to select/deselect math operators
 */
var initSettingsDropDown = function (){
    var dropDown = document.querySelector('.dropdown-content');

    Array.prototype.forEach.call(dropDown.children, child => {
        child.addEventListener('click', function () {
            //toggle item display in settings dropdown
            child.classList.toggle('selected');

            //update operators object and document
            if (child.classList.contains('selected')) {
                changeOperator(child.dataset.value, true);
                onSettingsChange('operatorAdded');
            } else {
                changeOperator(child.dataset.value, false);
                onSettingsChange('operatorRemoved');
            }
        });
    });
};

/**
 * Initializes Check button functionality
 */
var initCheckBtn = function () {
    var checkBtn = document.querySelector('.btn.check');

    checkBtn.addEventListener('click', function () {
        var userInputs = document.querySelectorAll('input');
        var normalizedAnswer;

        userInputs.forEach( input => {
            normalizedAnswer = Number( input.value.replace(',', '.') );         //replace ',' if user entered it instead of '.'
            var testId = input.previousSibling.dataset.id;

            if ( normalizedAnswer === tests[testId].result && input.value !== '') {
                tests[testId].resolved = true;
                input.nextSibling.innerText = true;
                input.nextSibling.style.backgroundColor = 'var(--main-color)';
            }
            else {
                tests[testId].resolved = false;
                input.nextSibling.innerText = false;
                input.nextSibling.style.backgroundColor = 'var(--main-color-failed)';
            }
        });

        if ( tests.areResolved() ) {
            showOverlayPrompt('You completed the test!');
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

/**
 * Initializes Test button click with new set of tests
 */
var initStartBtn = function () {
    document.querySelector('.btn.start').addEventListener('click', function () {
        tests.areResolved() ? showOverlayPrompt('You completed the test!'): showOverlayPrompt('Current test not finished');
    });
};

/**
 * Start again button at end screen
 */
document.querySelector('.btn.end-screen__start').addEventListener('click', function () {
    startNewTest();
    hideOverlayPrompt();
});

/**
 * Cancel again button at end screen
 */
document.querySelector('.btn.end-screen__cancel').addEventListener('click', function () {
    hideOverlayPrompt();
});




