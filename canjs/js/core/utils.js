'use strict'
define(['can'], {

  pairs: function (obj) {
    var keys = Object.keys(obj)
    var length = keys.length
    var pairs = new Array(length)
    var i = 0

    for (; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]]
    }
    return pairs
  },

  renameKeys: function (source, map) {
    can.each(this.pairs(map), function (pair) {
      var oldKey = pair[1]
      var newKey = pair[0]

      source[newKey] = source[oldKey]
      delete source[oldKey]
    })
    return source
  }
})
