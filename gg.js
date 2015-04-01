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

  /**
   * check the attr is a customer attribute
   * @param  {string}  attr attribute value
   * @param  {element}  host html node element
   * @return {Boolean}
   */
  gg.dom.isAttribute = function (attr, host) {
    host = host || document.createElement('div');
    return host.getAttribute(attr) === null && host[attr] === undefined;
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
  gg.dom.getClass = function (element) {
    if (element.classList) {
      return element.classList;
    } else {
      return element.className.replace(/\s+/, " ").split(" ");
    }
  };

  gg.dom.hasClass = function (element, value) {
    if ('classList' in element) {
      return element.classList.contains(value);
    } else {
      return -1 !== (" " + element.className + " ").indexOf(" " + value + " ");
    }
  };

  gg.dom.addClass = function (element, value) {
    if (typeof value == "string") {
      if (element.nodeType == Node.ELEMENT_NODE) {
        if ('classList' in element) {
          element.classList.add(value);
        } else {
          if (!element.className) {
            element.className = value;
          } else {
            var className = (element.className + " " + value).match(/\S/g);
            className.sort();
            for (var i = 0, len = className.length; i < len; i++) {
              if (className[i] == className[i+1]) {
                className.splice(i, 1);
              }
            }
            element.className = className.join(" ");
          }
        }
      }
    }
  };

  gg.dom.removeClass = function (element, value) {
    if (value === undefined) {
      return;
    }

    if (!this.hasClass(element, value)) {
      return;
    }
    if ('classList' in element) {
      element.classList.remove(value);
    } else {
      var reg = new RegExp('(\\s|^)' + value + '(\\s|$)');
      element.className = element.className.replace(reg, " ");
    }
  };

  gg.dom.clearClass = function (element) {
    element.className = "";
  }

  gg.dom.toggleClass = function (element, value) {
    element.classList.toggle(value);
  };

  gg.dom.replaceClass = function (element, old, neo) {
    this.removeClass(element, old);
    this.addClass(element, neo);
  };

  /**
   * 通过class获取Element
   * 支持Xpath
   */
  gg.dom.getElementsByClassName = function (className, tag, elm){
    if (document.getElementsByClassName) {
      getElementsByClassName = function (className, tag, elm) {
          elm = elm || document;
          var elements = elm.getElementsByClassName(className),
          nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
          returnElements = [],
          current;

        for(var i=0, il=elements.length; i<il; i+=1){
            current = elements[i];
            if(!nodeName || nodeName.test(current.nodeName)) {
                returnElements.push(current);
            }
        }
        return returnElements;
      };
    } else if (document.evaluate) {
      getElementsByClassName = function (className, tag, elm) {
          tag = tag || "*";
          elm = elm || document;
          var classes = className.split(" "),
              classesToCheck = "",
              xhtmlNamespace = "http://www.w3.org/1999/xhtml",
              namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
              returnElements = [],
              elements,
              node;
          for(var j=0, jl=classes.length; j<jl; j+=1){
              classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
          }
          try    {
              elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
          }
          catch (e) {
              elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
          }
          while ((node = elements.iterateNext())) {
              returnElements.push(node);
          }
          return returnElements;
      };
    } else {
      getElementsByClassName = function (className, tag, elm) {
          tag = tag || "*";
          elm = elm || document;
          var classes = className.split(" "),
              classesToCheck = [],
              elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
              current,
              returnElements = [],
              match;
          for(var k=0, kl=classes.length; k<kl; k+=1){
              classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
          }
          for(var l=0, ll=elements.length; l<ll; l+=1){
              current = elements[l];
              match = false;
              for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                  match = classesToCheck[m].test(current.className);
                  if (!match) {
                      break;
                  }
              }
              if (match) {
                  returnElements.push(current);
              }
          }
          return returnElements;
      };
    }

    return getElementsByClassName(className, tag, elm);
  };

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

  gg.util.type = function (obj) {
    if (obj === null) {
      return true;
    }

    if (obj === undefined) {
      return true;
    }

    if (typeof obj === "string") {
      return true;
    }

    if (typeof obj === "number") {
      return true;
    }
  };

  gg.util.makeArray = function (obj) {
    return Array.prototype.slice.call(obj);
  }

  gg.util.trim = function (string) {
    return string.replace(/^\s|\s$/g, '');
  };

  gg.util.extend = function (objA, objB) {
    for (var i in objB) {
      objA[i] = objB[i];
    }

    return objA;
  };

  /**
   * support features
   */

  /**
   * check browser diff the origin attr vs custmer attr
   */
  gg.support.setGetAttribute = function () {
    var el = document.createElement('div');
    el.setAttribute("className", "t");
    return el.className !== "t";
  }

  gg.util.checkEmail = function (email) {
        var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        if (!reg.test(email.trim())) {
            return false;
        } else {
            return true;
        }
    }
  };
  window.gg = gg;
})(window, document);
