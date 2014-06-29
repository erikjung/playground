define([
  'model/thing',
  'model/items'
],
function (Thing, Items) {

  var State = can.Map.extend({
    define: {
      thing: {
        Value: Thing
      },
      thingLastUpdated: {
        type: 'string',
        get: function () {
          return new Date(this.attr('thing.lastUpdated')).toLocaleTimeString()
        }
      },
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
      }
    }
  })

  var instance = new State()
  var thing = instance.attr('thing')

  // Trigger auto-save when thing value is changed
  thing.bind('someValue', function () {
    thing.save()
  })

  // Allows for console debugging
  window.APP_STATE = instance

  return instance
})