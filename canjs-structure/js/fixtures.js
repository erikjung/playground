
define(['json!products'], function (products) {

  var store = can.fixture.store

  var productStore = store(products.length - 1, function (i) {
    return products[i]
  })

  can.fixture({

    /** Products */

    'GET /products': function (req) {
      return productStore.findAll(req)
    },

    /** Thing */

    'POST /thing/new': function (req) {
      return can.extend({}, req.data, { id: 1 })
    },

    'GET /thing/{id}': function (req) {
      return {
        id: req.data.id,
        someValue: Math.random() + 1
      }
    },

    'POST /thing/update': function () {
      return {
        lastUpdated: Date.now()
      }
    },

    /** Items */

    'GET /items/{id}': function (req) {
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

  can.fixture.delay = 600
})
