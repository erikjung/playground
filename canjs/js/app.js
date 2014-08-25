'use strict'
define([
  'module',
  'can',
  'core/events',
  'map/appState',
  'model/product',
  'model/order',
  'control/page',
  'control/list',
  'component/quantity'
],
function (
  module,
  can,
  events,
  AppState,
  Product,
  Order,
  Page,
  List
) {
  var config = module.config()

  return can.Construct.extend({
    init: function () {
      var route = this[config.route]

      this.state = new AppState({
        sorting: config.sorting
      })

      this.page = new Page('.js-app', {
        appState: this.state
      })

      if (can.isFunction(route)) route.call()
    },

    order: function () {
      new List('.js-app-list', {
        list: new Product.List({}),
        template: '#product-list-tpl'
      })
    },

    review: function () {
      console.log('review')
    },

    checkout: function () {
      console.log('checkout')
    }
  })
})
