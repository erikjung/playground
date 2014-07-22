var R = require('ramda');

function init (data) {
  var filter = R.rPartial(R.filter, data);
  var find = R.rPartial(R.find, data);
  var findex = R.rPartial(R.findIndex, data);
  var push = R.rPartial(R.invoker('push', Array.prototype), data);
  var splice = R.rPartial(R.invoker('splice', Array.prototype), data);
  var first = R.wrap(data, R.first);
  var last = R.wrap(data, R.last);
  var count = R.wrap(data, R.size);
  var add1 = R.add(1);
  var newId = R.compose(add1, count);

  function findAll (params) {
    return filter(R.where(params));
  }

  function findOne (params) {
    return find(R.where(params));
  }

  function create (params) {
    var base = { id: newId() };
    push(R.mixin(base, params));
    return last();
  }

  function update (id, params) {
    var index = findex(R.propEq('id', id));
    return data[index] = R.mixin(data[index], params);
  }

  function destroy (id) {
    var index = findex(R.propEq('id', id));
    var removed = R.mixin(data[index], {});
    splice(index, 1);
    return removed;
  }

  return {
    findAll: findAll,
    findOne: findOne,
    create: create,
    update: update,
    destroy: destroy
  };
}

module.exports = init;