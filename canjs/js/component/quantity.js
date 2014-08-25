'use strict'
define(['can'], function (can) {
  can.Component.extend({
    tag: 'x:quantity',
    template: can.view('/templates/component/quantity'),
    scope: {
      value: 0,
      add: function () {
        var value = this.attr('value')
        this.attr('value', value + 1)
      },
      subtract: function () {
        var value = this.attr('value')
        this.attr('value', value - 1)
      }
    }
  })
})
