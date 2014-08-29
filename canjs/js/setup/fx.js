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
    $.Velocity(event.target, transition, {
      complete: function () { event.resume() }
    })
  }

  function setEffect (name, key, value) {
    $.Velocity.RegisterUI.packagedEffects[name][key] = value
  }

  /** Custom Animations */

  $.Velocity.RegisterUI('transition.slideUp', {
    defaultDuration: FPS * 16,
    calls: [
      [ { height: '*=1.1' } ],
      [ { height: '0px', opacity: 0 } ]
    ]
  })

  /** Overrides */

  setEffect('callout.pulse', 'defaultDuration', FPS * 24)
  setEffect('transition.slideLeftIn', 'defaultDuration', FPS * 24)

  /*
   * Animation for elements when they trigger "fx-on{event}"
   * e.g. $(elem).trigger('void') => "fx-onvoid"
   */
  can.view.attr(/fx-/, bindAnimation)
})
