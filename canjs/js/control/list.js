'use strict'
define([
  'can',
  'control/modal'
],
function (can, Modal) {
  return can.Control.extend({
    defaults: {
      remover: '.js-item-del'
    }
  }, {
    init: function (element, options) {
      var view = can.view(options.template)
      var list = options.list
      element.html(view(list))
    }
  })
})
