'use strict'
define(['can'], function (can) {
  return can.Map.extend({
    define: {
      sorting: {
        type: 'string'
      }
    }
  })
})
