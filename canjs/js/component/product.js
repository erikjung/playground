'use strict'
define([
  'can',
  'component/quantity'
],
function (can) {
  can.Component.extend({
    tag: 'x:product',
    scope: {
      isVoid: false,
      void: function () {
        this.attr('isVoid', true)
      }
    },
    events: {
      '{scope} isVoid': function (scope, event, newVal) {
        if (newVal) this.element.trigger('voided')
      }
    }
  })
})
