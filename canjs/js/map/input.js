'use strict'
define(['can'], function (can) {
  return can.Map.extend({
    init: function () {
      this.validate('value', function (value) {
        if (value !== 'Foo') return 'This is not right'
      })
    }
  }, {
    define: {
      type: {
        type: 'string',
        value: 'text'
      },
      required: {
        type: 'boolean',
        value: false
      },
      placeholder: {
        type: 'string'
      },
      min: {
        type: 'number'
      },
      max: {
        type: 'number'
      }
    },
    errorMessages: function () {
      return this.errors('value')
    }
  })
})
