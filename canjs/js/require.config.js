require.config({
  baseUrl: '/js',
  useDataMain: false,
  paths: {
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
    can: '../vendor/can.custom',
    jquery: '//code.jquery.com/jquery-2.1.1.min',
    jquerypp: '../vendor/jquerypp.custom',
    json: '../vendor/json',
    magnific_popup: '../vendor/jquery.magnific-popup.custom',
    orders: '../data/orders.json',
    products: '../data/products.json',
    text: '../vendor/text',
    velocity: '../vendor/jquery.velocity.min',
    velocity_ui: '../vendor/velocity.ui'
  },
  shim: {
    jquerypp: {
      deps: ['jquery']
    },
    can: {
      deps: ['jquery'],
      exports: 'can'
    },
    bootstrap: {
      deps: ['jquery']
    },
    velocity: {
      deps: ['jquery']
    },
    velocity_ui: {
      deps: ['velocity']
    }
  }
})
