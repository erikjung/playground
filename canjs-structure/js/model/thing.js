define(['fixtures'], function () {
  return can.Model.extend({
    create  : 'POST /thing/new',
    findOne : 'GET /thing/{id}',
    update  : 'POST /thing/update'
  }, {
    // Default values for new items
    someValue: 0,
    someOtherValue: true
  })
})
