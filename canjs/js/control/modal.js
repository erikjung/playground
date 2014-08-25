'use strict'
define([
  'can',
  'bootstrap',
  'component/modal'
],
function (can) {
  return can.Control.extend({
    /**
     * Renders the requested template;
     * Wraps the rendered template in a <div> and appends it to the body;
     * Initializes the modal plugin on the wrapping <div> element;
     * Returns the modal-initialized <div> element along with original options;
     */
    setup: function (template, options) {
      var element = can.$('<div class="modal" />')
      var view = can.view(template, {
        reject: options.issue.reject,
        resolve: options.issue.resolve
      })

      element = element.appendTo(document.body)
      element.append(view)
      element.modal({ show: false })

      options.issue.always(function () {
        element.modal('hide')
      })
      return [element, options]
    },

    /**
     * Shows the modal UI;
     * Binds a one-time event handler that removed the control element and
     * rejects the deferred issue when the model UI is hidden;
     */
    init: function (element, options) {
      element.modal('show')
      element.one('hidden.bs.modal', function () {
        element.remove()
        options.issue.reject()
      })
    }
  })
})
