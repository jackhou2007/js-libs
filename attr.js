function getAttr(ele, attr) {
  var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
  if (!result) {
    var attrs = ele.attributes,
      len = attrs.length;

    for (var i=0; i<len; i++) {
      if (attrs[i].nodeName === attr) {
        result = attrs[i].nodeValue;
      }
    }
  }

  return result;
}