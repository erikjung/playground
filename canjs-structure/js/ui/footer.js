/**
 * All that happens in this file is observations and UI reactions to the global state
 */
define(['core/state'], function (state) {
  var footer = $('.js-footer')
  var infoAlert = footer.find('.js-alert-info')
  var warningAlert = footer.find('.js-alert-warning')
  var successAlert = footer.find('.js-alert-success')

  function updateInfoAlert () {
    infoAlert.velocity('callout.shake')
  }

  function updateWarningAlert () {
    warningAlert.velocity('callout.flash')
  }

  function updateSuccessAlert () {
    successAlert.velocity('callout.tada')
  }

  state.bind('thing.created', updateInfoAlert)
  state.bind('thing.updated', updateInfoAlert)
  state.bind('itemsPending', function (event, isPending) {
    if (isPending) updateWarningAlert()
    else updateSuccessAlert()
  })
})