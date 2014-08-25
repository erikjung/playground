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
      return this._super(attrs)
    }
  })
})
