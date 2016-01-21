// DO NOT MODIFY THIS FILE!

(function testFramework(window, document) {
  'use strict'; // Run all tests in strict mode :)

  var testNumber = 0;
  var curRun;
  var ordinals = [
    '1st',  '2nd',  '3rd',  '4th',  '5th',  '6th',  '7th',  '8th',  '9th',  '10th',
    '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th'
  ];

  window.assert = function assert(condition) {
    curRun.push(condition);
  };

  window.test = function test(name, callback) {
    // Make a new div on the page to hold the test results
    var testDiv = createTestDiv(name);
    document.body.appendChild(testDiv);

    try {
      if (typeof callback === 'function') {
        window.CHANGEME = NaN; // NaN isn't equal to anything, even itself :)
        curRun = [];           // Reset run statistics
        testNumber++;          // Advance to the next test

        // Check for illegal things :)
        if (callback.toString().indexOf('__proto__') !== -1) {
          throw new KevinCaughtYouError('Illegal use of __proto__');
        } else if (selfComparison(callback)) {
          throw new KevinCaughtYouError('Yes, of COURSE it is equal to itself');
        } else if (callback.toString().indexOf('assert') === -1) {
          throw new KevinCaughtYouError('You took out all the asserts');
        }

        callback(); // Actually run the test

        if (curRun.every(Boolean)) {
          pass(testDiv);
        } else {
          fail(testDiv);
        }
      }
    } catch (err) {
      fail(testDiv, err);
    }
  };

  function createTestDiv(name) {
    var testDiv = document.createElement('div');

    testDiv.style.fontFamily = 'Arial';
    testDiv.style.backgroundColor = '#424242';
    testDiv.style.color = '#ffffff';
    testDiv.style.padding = '1em';
    testDiv.style.marginBottom = '0.5em';

    testDiv.textContent = name;

    return testDiv;
  }

  function pass(div) {
    div.style.backgroundColor = '#4CAF50';
    div.innerHTML = '&#10004; ' + testNumber + '. ' + div.innerHTML;
  }

  function fail(div, exception) {
    div.style.backgroundColor = '#F44336';
    div.innerHTML = '&#10008; ' + testNumber + '. ' + div.innerHTML + failureMessage(exception);
  }

  function failureMessage(exception) {
    return ' (' +
           (exception ?
             'Uncaught ' + exception :
             curRun.map(function (result, i) {
               return result ? false : ordinals[i];
             }).filter(Boolean).join(', ') + ' failing') +
           ')';
  }

  function selfComparison(callback) {
    var comparisons = callback.toString().match(/\(.*===.*\)/g);

    if (comparisons) {
      return comparisons.filter(function (comp) {
        var sides = comp.split('===').map(function (side) {
          return side.trim().replace('(', '').replace(')', '');
        });

        return sides[0] === sides[1];
      }).length > 0;
    }

    return false;
  }

  function KevinCaughtYouError(message) {
    this.name = 'KevinCaughtYouError';
    this.message = message + '! Bad TTS student!';
  }

  KevinCaughtYouError.prototype = new Error();
}(window, document));
