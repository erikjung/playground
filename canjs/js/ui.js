'use strict'
define([
  'can',
  'jquerypp',
  'velocity_ui'
],
function (can) {

  function bindAnimation (el, attrData) {
    var attrName   = attrData.attributeName        // e.g. "fx-onvoid"
    var eventType  = attrName.split('fx-on').pop() // e.g. "void"
    var transition = el.getAttribute(attrName)     // e.g. "slideUpIn"

    can.on.call(el, eventType, function (event) {
      animate(event, transition)
    })
  }

  function animate (event, transition) {
    event.pause()
    $.Velocity(event.target, 'transition.' + transition, {
      complete: function () { event.resume() }
    })
  }

  /*
   * Animation for elements when they trigger "fx-on{event}"
   * e.g. $(elem).trigger('void') => "fx-onvoid"
   */
  can.each([
    'fx-oninserted',
    'fx-onvoid'
  ], function (name) {
    can.view.attr(name, bindAnimation)
  })
})
