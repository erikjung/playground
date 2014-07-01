define(['fixtures'], function () {
  return can.Model.extend({
    create  : 'POST /order/create',
    findOne : 'GET /order/find/{id}',
    update  : 'POST /order/update',
    destroy : 'POST /order/remove'
  }, {
    // Default values for new items
    productIds: [],
    subtotal: 0.00,
    type: 'pickup',
    taxExemptions: [],
    pickup: {
      storeLocation: null,
      time: Date.now()
    },
    delivery: {
      address: '',
      time: Date.now()
    }
  })
})
