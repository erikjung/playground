define([
  'model/thing',
  'model/items',
  'model/product'
],
function (Thing, Items, Product) {

  var State = can.Map.extend({
    define: {

      /** Things */

      thing: {
        Value: Thing
      },

      thingLastUpdated: {
        type: 'string',
        get: function () {
          return new Date(this.attr('thing.lastUpdated')).toLocaleTimeString()
        }
      },

      /** Items */

      items: {
        Value: Items.List,
        get: function (currentItems) {
          this.attr('lastItemRequest')
          currentItems.replace( Items.findAll({}) )
          return currentItems
        }
      },

      itemsPending: {
        get: function () {
          return this.attr('items').isPending()
        }
      },

      lastItemRequest: {
        type: 'number',
        value: 0
      },

      /** Products */

      productLimit: {
        type: 'number',
        value: 10
      },

      productOffset: {
        type: 'number',
        value: 0
      },

      productsPending: {
        type: 'boolean',
        value: false
      }

    }
  })

  // The singleton instance exported by the module
  var instance = new State()

  //
  // var thing = instance.attr('thing')

  // Trigger auto-save when thing value is changed
  // thing.bind('someValue', function () {
  //   thing.save()
  // })

  // Allows for console debugging
  window.APP_STATE = instance

  return instance
})
