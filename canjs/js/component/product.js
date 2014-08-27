'use strict'
define([
  'can',
  'component/quantity'
],
function (can) {
  can.Component.extend({
    tag: 'x:product',
    scope: {

    },
    events: {
      '.js-item-del click': function (element, event) {
        this.element.trigger('voided')
        event.preventDefault()
      }
    }
  })
})
