define(function () {
  return can.Construct.extend({
    init: function (street1, street2, city, state, zipCode) {
      this.street1 = street1
      this.street2 = street2
      this.city    = city
      this.state   = state
      this.zipCode = zipCode
    }
  })
})
