'use strict'
define([
  'can',
  'control/modal'
],
function (can, Modal) {
  return can.Control.extend({
    defaults: {
      item: '.js-item',
      list: undefined,
      template: undefined
    }
  }, {
    init: function (element, options) {
      var view = can.view(options.template)
      var list = options.list
      element.html(view(list))
    },

    '{item} voided': function (element) {
      var model = element.data('model')
      model.destroy()
    }
  })
})
