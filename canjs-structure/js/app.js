define([
  'core/events',
  'core/state',
  'model/thing',
  'model/items',
  'model/product',
  'model/order',
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
  Product,
  Order,
  AppControl
) {
  var App = can.Construct.extend({
    setup: function () {
      $.ajaxSetup({

      })
    },

    init: function () {
      this.appControl = new AppControl('.js-app')
      this.appControl.bind(events.UPDATE_THING, can.proxy(this.updateThing, this))
      this.appControl.bind(events.UPDATE_ITEMS, can.proxy(this.updateItems, this))

      new Order({ productIds: [1,2,3], subtotal: 44.55 }).save(function (res) {
        console.log(res)
      })
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
