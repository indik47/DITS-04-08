'use strict';

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
 * Gets active operators from the settings
 * @return {Array}
 */
function getEnabledOperators() {
    var enabledOperators = [];
    for (var key in operators) {
        if (operators[key] === true) {
            enabledOperators.push(key);
        }
    }
    return enabledOperators;
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
 *  Get the math operator from enabled ones
 * @return {string}
 */
var getOperator = function () {
    //filter only selected operators from Settings dropdown
    var enabledOperators = getEnabledOperators();
    //choose random operator
    var randomIndex = getNumber(enabledOperators.length - 1);
    return enabledOperators[randomIndex];
};

/**
 * Initialize page
 */
var clearPage = function () {
    var parent = document.querySelector('.container.expressions');
    parent.innerHTML = '';
};


/**
 * Shows end screen
 */
var showOverlayPrompt = function (message) {
    var overlay = document.querySelector('div.end-screen');
    var text = document.querySelector('.end-screen__title');
    text.innerText = message;
    overlay.style.left = '0';
};

/**
 * Hides end screen
 */
var hideOverlayPrompt = function () {
    var overlay = document.querySelector('div.end-screen');
    overlay.style.left = '-100%';
};

var clearTests = function (){
    Object.keys(tests).forEach( function(key) { delete tests[key]; });
};

/**
 * Remakes tests after settings changes
 * @param setting
 */
var onSettingsChange = function (setting) {
    var enabledOperators = getEnabledOperators();
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
            if (!enabledOperators.includes(tests[span.dataset.id].operator)) {
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
