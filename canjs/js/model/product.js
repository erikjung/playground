'use strict'
define([
  'can',
  'core/utils',
  'fixtures'
],
function (can, utils) {
  return can.Model.extend({
    resource: '/product'
  }, {
    setup: function (attrs) {
      utils.renameKeys(attrs, {
        name: 'displayName'
      })
      this._super(attrs)
    }
  })
})
