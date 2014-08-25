'use strict'
define(['can'], function (can) {

  can.Component.extend({
    tag: 'x:modal',
    template: can.view('/templates/component/modal'),
    scope: {
      confirm: '@',
      deny: '@',
      message: '@',
      title: '@'
    }
  })
})
