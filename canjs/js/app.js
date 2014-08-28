'use strict'
define([
  'module',
  'can',
  'core/events',
  'map/appState',
  'map/person',
  'model/product',
  'model/order',
  'control/page',
  'control/list',
  'component/product',
  'component/form',
  'setup/fx'
],
function (
  module,
  can,
  events,
  AppState,
  Person,
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
        item: '.js-product',
        list: productList,
        template: '#product-list-tpl'
      })

      can.$('.js-item-add').on('click', function () {
        productList.unshift(new Product({
          id: productList.length,
          displayName: 'New Product',
          price: 100
        }))
      })

      can.$('.js-app-form').append(
        can.view('form-tpl', new Person({
          firstName: 'Joe',
          lastName: 'Wood',
          address: '123 NE Soup Street',
          email: 'tacotown@npr.org'
        }))
      )
    },

    review: function () {
      console.log('review')
    },

    checkout: function () {
      console.log('checkout')
    }
  })
})
