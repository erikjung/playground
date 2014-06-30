require.config({
  paths: {
    text: '../vendor/text',
    json: '../vendor/json',
    products: '../data/products.json'
  }
})

require(['app'], function (App) {
  var app = new App()
})
