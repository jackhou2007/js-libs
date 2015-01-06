/**
 * @date 2015-01-06
 * @author jialin.hou@raidtalk.com
 */
;(function (window, document, undefined) {
  var gg = {};
  gg.$ = function (selector, element) {
    if (!element) {
      element = document;
    }

    try {
      return element.querySelector(selector);
    } catch (e) {

    }
  };

  gg.$$ = function (selector, element) {
    if (!element) {
      element = document;
    }

    try {
      return element.querySelectorAll(selector);
    } catch (e) {

    }
  };

  gg.id = function (selector, element) {
    if (!element) {
      element = document;
    }

    return element.getElementById(selector);
  };

  window.gg = gg;
})(window, document);