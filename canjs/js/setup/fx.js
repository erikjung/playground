'use strict'
define([
  'can',
  'jquerypp',
  'velocity_ui'
],
function (can) {
  var FPS = 1000 / 60;

  function bindAnimation (el, attrData) {
    var attrName   = attrData.attributeName      // e.g. "fx-onvoid"
    var eventType  = attrName.split('fx-').pop() // e.g. "void"
    var transition = el.getAttribute(attrName)   // e.g. "slideUpIn"

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

  /** Animations */

  $.Velocity.RegisterUI('transition.slideUp', {
    defaultDuration: FPS * 10,
    calls: [
      [ { height: '*=1.1' } ],
      [ { height: '0px', opacity: 0 } ]
    ]
  });

  /*
   * Animation for elements when they trigger "fx-on{event}"
   * e.g. $(elem).trigger('void') => "fx-onvoid"
   */
  can.each([
    'fx-inserted',
    'fx-voided'
  ], function (name) {
    can.view.attr(name, bindAnimation)
  })
})
