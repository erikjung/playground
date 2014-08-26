'use strict'
define([
  'can',
  'core/utils',
  'fixtures'
],
function (can, utils) {
  return can.Model.extend({
    resource: '/product',
    destroy: function (id, attrs) {
      var def = can.Deferred()
      def.resolve(attrs)
      return def
    }
  }, {
    setup: function (attrs) {
      utils.renameKeys(attrs, {
        name: 'displayName'
      })
      this._super(attrs)
    }
  })
})
