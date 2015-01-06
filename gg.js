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
  gg.dom.mode = function () {
    return document.compatMode;
  };

  gg.dom.activeElement = function () {
    return document.activeElement;
  };

  gg.dom.global = function () {
    return document.defaultView;
  };

  gg.dom.doc = function () {
    return document.body.ownerElement;
  };

  gg.dom.isElement = function (element) {
    return element && element.nodeType === Node.ELEMENT_NODE;
  };

  gg.dom.byClass = function (selector, element) {
    if (!element) {
      element = document;
    }

    return element.getElementsByClassName(selector);
  }

  gg.dom.children = function (element) {
    var children = element.children,
      result = [];

    for (var i = 0, len = children.length; i < len; i++) {
      if (isElement(children[i])) {
        result.push(children[i]);
      }
    }

    return result;
  };

  gg.dom.attributes = function (element) {
    var attributes = [],
      attrs = element.attributes;

    for (var i = 0, len = attrs.length; i < len; i++) {
      attributes.push(attrs[i]);
    }

    reutrn attributes;
  };

  gg.dom.prop = function (element, attr, value) {

    // get prop
    if (undefined === value) {
      return element.getAttribute(attr);
    } else {
      if (value == '') {
        element.removeAttribute(attr);
      } else {
        element.setAttribute(attr, value);
      }
    }
  };

  /**
   * DOM Style Computed
   * @param {object} element "selected element Node"
   * @param {string} value   "class name"
   */
  gg.dom.addClass = function (element, value) {
    if (value === undefined) {
      return;
    }

    if (element.classList) {
      element.classList.add(value);
    } else {
      var className = this.prop('class');
      if (!className.indexOf(value)) {
        className += value;
        this.prop(element, 'class', className);
      }
    }
  };

  gg.dom.removeClass = function (element, value) {
    element.classList.remove(value);
  };

  gg.dom.toggleClass = function (element, value) {
    element.classList.toggle(value);
  };

  gg.dom.hasClass = function (element, value) {
    return element.classList.contains(value);
  }

  /**
   * data attr
   */
  gg.dom.data = function (element, attr, value) {
    if (undefined === value) {
      return element.dataset.attr;
    }

    element.dataset.attr = value;
  };

  gg.dom.firstChild = function (element) {
    return isElement(element) ? element.firstChild : null;
  };

  gg.dom.isEqual = function (elemA, elemB) {
    return elemA.isEqualNode(elemB);
  };

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