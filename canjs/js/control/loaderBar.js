define(['core/state'], function (state) {
  return can.Control.extend({
    pluginName: 'loaderBar'
  }, {
    init: function (element) {
      element.html(can.view('product-loader.tpl', state))
    }
  })
})
