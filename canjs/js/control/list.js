'use strict'
define(['can'], function (can) {
  return can.Control.extend({

    init: function (element, options) {
      var view = can.view(options.template)
      var list = options.list
      element.html(view(list))
    },

    '.item inserted': function () {
      console.log(arguments)
    },

    '{remover} click': function (element, event) {

    }
  })
})
