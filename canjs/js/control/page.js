'use strict'
define([
  'can'
],
function (can) {
  return can.Control.extend({
    init: function (element, options) {
      var appState = options.appState.attr()
      if (appState.scrollY) window.scrollY = appState.scrollY
    },

    '{window} scroll': function () {
      this.options.appState.attr('scrollY', window.scrollY)
    }
  })
})
