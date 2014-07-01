define([
  'core/state',
  'model/product'
],
function (state, Product) {
  return can.Control.extend({
    pluginName: 'productList'
  }, {
    init: function (element) {
      state.bind('productOffset', can.proxy(function (event, newOffset) {
        this.appendProducts(newOffset)
      }, this))
    },

    appendProducts: function (offset) {
      var element = this.element
      state.attr('productsPending', true)
      Product.findAll({ limit: state.productLimit, offset: offset }, function (results) {
        element.append(can.view('product-list.tpl', results))
        state.attr('productsPending', false)
      })
    }
  })
})
