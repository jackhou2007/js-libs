/**
 * @date 2015-01-07
 * @author jialin.hou@raidtalk.com
 */
;(function (window, document, undefined) {
  var event = {};

  event.addEvent = function (el, type, handler, capture) {
    if (el.dispatchEvent) {
      el.addEventListener(type, handler, !!capture);
    } else {
      el.attachEvent('on' + type, handler);
    }

    return handler;
  };

  event.removeEvent = function (el, type, handler, capture) {
    if (el.dispatchEvent) {
      el.removeEventListener(type, handler, !!capture);
    } else {
      el.detachEvent('on' + type, handler);
    }
  };

  event.fireEvent = function (el, type, args, event) {
    args = args || {};

    if (el.dispatchEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(type, true, true);
    } else {
      event = document.createEventObject();
    }

    for (var i in args) {
      if (args.hasOwnProperty(i)) {
        event[i] = args[i];
      }
    }

    if (el.dispatchEvent) {
      el.dispatchEvent(event);
    } else {
      el.fireEvent('on' + type,  event)
    }
  };

  window.gg = window.gg || {};
  window.gg.event = event;
})(window, document);