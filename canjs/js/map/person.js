'use strict'
define(['can'], function (can) {
  var basicSetter = function (newVal) {
    return can.trim(newVal)
  }

  return can.Map.extend({
    init: function () {
      this.validateFormatOf(['phone'], /\d{3}[\-]\d{3}[\-]\d{4}/, {
        message : 'invalid phone number format'
      })
    }
  }, {
    define: {
      firstName: {
        type: 'string',
        set: basicSetter
      },
      lastName: {
        type: 'string',
        set: basicSetter
      },
      phone: {
        type: 'string',
        set: basicSetter
      },
      email: {
        type: 'string',
        set: basicSetter
      }
    }
  })
})
