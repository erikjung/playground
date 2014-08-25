require.config({
  baseUrl: '/js',
  useDataMain: false,
  paths: {
    can: '../vendor/can.custom',
    jquery: '//code.jquery.com/jquery-2.1.1.min',
    json: '../vendor/json',
    orders: '../data/orders.json',
    products: '../data/products.json',
    text: '../vendor/text',
    velocity: '../vendor/jquery.velocity.min',
    velocity_ui: '../vendor/velocity.ui'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    can: {
      deps: ['jquery'],
      exports: 'can'
    }
  }
})
