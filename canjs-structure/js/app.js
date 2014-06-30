define([
  'core/events',
  'core/state',
  'model/thing',
  'model/items',
  'control/app',
  'ui/header',
  'ui/body',
  'ui/footer'
],
function (
  events,
  state,
  Thing,
  Items,
  AppControl
) {
  var App = can.Construct.extend({
    setup: function () {
      $.ajaxSetup({
        isLocal: true
      })
    },

    init: function () {
      this.appControl = new AppControl('.js-app')
      this.appControl.bind(events.UPDATE_THING, can.proxy(this.updateThing, this))
      this.appControl.bind(events.UPDATE_ITEMS, can.proxy(this.updateItems, this))
    },

    updateThing: function (event, data) {
      state.attr('thing.someValue', Math.random() + 1)
    },

    updateItems: function (event, data) {
      state.attr('lastItemRequest', Date.now())
    },
  })

  can.extend(App.prototype, can.event)
  return App
})
