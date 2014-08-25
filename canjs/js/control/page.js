'use strict'
define([
  'can',
  'control/modal'
],
function (can, Modal) {
  return can.Control.extend({
    init: function (element, options) {
      var appState = options.appState.attr()
      if (appState.scrollY) window.scrollY = appState.scrollY
    },

    '.js-modal-trigger click': function (element) {
      var def = can.Deferred()
      var template = element.data('modal')

      new Modal(template, { issue: def })
      def.done(function () {
        alert('Resolved')
      })
      def.fail(function () {
        alert('Rejected')
      })
    },

    '{window} scroll': function () {
      this.options.appState.attr('scrollY', window.scrollY)
    }
  })
})
