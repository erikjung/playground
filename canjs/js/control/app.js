define([
  'core/events',
  'core/state',
  'control/productList',
  'control/loaderBar'
],
function (
  events,
  state,
  ProductList,
  LoaderBar
) {
  var App = can.Control.extend({

    init: function (element) {
      this.productList = new ProductList(element.find('.js-product-list'))
      this.loaderBar = new LoaderBar(element.find('.js-product-loader'))
    },

    '.js-control-1  click': function () {
      this.dispatch(events.UPDATE_THING)
    },

    '.js-control-2  click': function () {
      this.dispatch(events.UPDATE_ITEMS)
    },

    '.js-products-trigger  click': function () {
      this.dispatch(events.UPDATE_PRODUCT_OFFSET)
    }
  })

  can.extend(App.prototype, can.event)
  return App
})
