'use strict'
define([
  'can'
],
function (can) {
  can.Component.extend({
    tag: 'x:form',
    scope: function (attrs, parentScope, el) {
      return parentScope.attr('.')
    },
    events: {
      init: function () {
        console.log(this.scope.attr())
      }
    },
    helpers: {
      invalid: function (attr, options) {
        var errors = this.errors(attr)
        return errors ? options.fn() : options.inverse()
      }
    }
  })
})
