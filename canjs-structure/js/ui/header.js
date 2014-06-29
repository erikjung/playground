/**
 * All that happens in this file is observations and UI reactions to the global state
 */
define(['core/state'], function (state) {
  var header = $('.js-header')
  var headerChangeStatus = header.find('.js-total-changes')

  // Fade in+out and update the change counter
  function update () {
    var text = headerChangeStatus.text()
    headerChangeStatus.text(parseInt(text) + 1)
      .velocity({ opacity: 0 })
      .velocity('reverse')
  }

  state.bind('thing.created', update)
  state.bind('thing.updated', update)
})