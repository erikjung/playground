
define(['json!products'], function (products) {

  /** Helpers */

  var productStore = can.fixture.store(products.length - 1, function (i) {
    return products[i]
  })

  function extendWithId (data) {
    return can.extend({}, data, { id: 1 })
  }

  /** The fixtures */

  can.fixture({

    /** Products */

    'GET /products': function (request) {
      return productStore.findAll(request)
    },

    /** Orders */

    'POST /order/create': function (request) {
      return extendWithId(request.data)
    },

    /** Things */

    'POST /thing/new': function (request) {
      return extendWithId(request.data)
    },

    'GET /thing/{id}': function (request) {
      return {
        id: request.data.id,
        someValue: Math.random() + 1
      }
    },

    'POST /thing/update': function () {
      return {
        lastUpdated: Date.now()
      }
    },

    /** Items */

    'GET /items/{id}': function (request) {
      return {
        id: 1,
        name: 'One'
      }
    },

    'GET /items': function () {
      return [
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' }
      ]
    }
  })

  /** Options */
  
  can.fixture.delay = 600
})
