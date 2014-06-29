define(['core/state'], function (state) {
  return can.Control.extend({
    pluginName: 'status'
  }, {
    init: function (element) {
      element.html(can.view('status.tpl', state))
    }
  })
})