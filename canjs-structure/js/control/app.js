define([
  'core/events',
  'core/state'
],
function (events, state) {
  var App = can.Control.extend({

    '.js-control-1  click': function () {
      this.dispatch(events.UPDATE_THING)
    },

    '.js-control-2  click': function () {
      this.dispatch(events.UPDATE_ITEMS)
    }
  })

  can.extend(App.prototype, can.event)
  return App
})