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

  gg.getChildren = function (selector, element) {
    var parent = this.$(selector, element);
    return parent.childNodes;
  };

  /**
   * DOM
   */
  gg.dom = gg.dom || {};
  gg.dom.isElement = function (element) {
    return element && element.nodeType === Node.ELEMENT_NODE;
  }

  gg.dom.firstChild = function (element) {
    return isElement(element) ? element.firstChild : null;
  }

  /**
   * tools (include extend grammer)
   * @type {[type]}
   */
  gg.util = gg.util || {};
  gg.util.isArray = function (obj) {
    return Object.protype.toString.call(obj) === '[Object Array]';
  };

  gg.util.makeArray = function (obj) {
    return Array.prototype.slice.call(obj);
  }

  gg.util.trim = function (string) {
    return string.replace(/^\s|\s$/g, '');
  };

  gg.util.extend = function () {

  };

  window.gg = gg;
})(window, document);