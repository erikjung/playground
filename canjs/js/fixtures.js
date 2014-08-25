
define([
  'can',
  'json!orders',
  'json!products'
],
function (
  can,
  orders,
  products
) {
  var store = can.fixture.store
  var Order = store(2, function (i) { return orders[i] })
  var Product = store(10, function (i) { return products[i] })

  can.fixture.delay = 600

  can.fixture({
    'GET /product': Product.findAll,
    'GET /product/{id}': Product.findOne,
    'GET /order': Order.findAll,
    'GET /order/{id}': Order.findOne,
  })
})
