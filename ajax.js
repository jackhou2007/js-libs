/**
 * @date 2015-01-07
 * @author jialin.hou@raidtalk.com
 */
;(function (window, document, undefined) {
  var xhr,
    onComplete,
    onSuccess,
    onError;

  function ajax(options) {
    xhr = new XMLHttpRequest();
    window.util.extend({}, this.defaults, options);
  }

  window.gg.ajax = ajax;
}).call(this);