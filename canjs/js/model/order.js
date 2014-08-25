'use strict'
define([
  'can',
  'core/utils',
  'fixtures'
],
function (can, utils) {
  return can.Model.extend({
    resource: '/order'
  }, {
    setup: function (attrs) {
      utils.renameKeys(attrs, {
        name: 'orderName',
        subTotal: 'orderSubTotal'
      })
      this._super(attrs)
    }
  })
})
