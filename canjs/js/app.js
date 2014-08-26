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
  'component/product',
  'ui'
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
      var productList = new Product.List({})
      new List('.js-app-list', {
        list: productList,
        template: '#product-list-tpl'
      })
      productList.bind('change', function () {
        console.log(arguments)
      })
      can.$('.js-item-add').on('click', function () {
        productList.unshift(new Product({
          id: productList.length,
          displayName: 'New Product',
          price: 100
        }))
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
