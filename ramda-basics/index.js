var R = require('ramda')

var products = [
  {
    id: 1,
    name: 'tooth brush',
    price: 2.55,
    onSale: true
  },
  {
    id: 2,
    name: 'milk',
    price: 3.20,
    onSale: true
  },
  {
    id: 3,
    name: 'shampoo',
    price: 6.99
  }
]

var filter = R.rPartial(R.filter, products);

var find = R.rPartial(R.find, products);

var findex = R.rPartial(R.findIndex, products);

var push = R.rPartial(R.invoker('push', Array.prototype), products);

var splice = R.rPartial(R.invoker('splice', Array.prototype), products);

var first = R.wrap(products, R.first);

var last = R.wrap(products, R.last);

var count = R.wrap(products, R.size);

var add1 = R.add(1);

var newId = R.compose(add1, count);

/** */

var findAll = R.useWith(filter, R.where);

var findOne = R.useWith(find, R.propEq('id'));

var findIndex = R.useWith(findex, R.propEq('id'));

function create (params) {
  var item = R.mixin({ id: newId() }, params);
  push(item);
  return last();
}

var update = function (id, params) {
  var index = findIndex(id);
  return products[index] = R.mixin(products[index], params);
};

/** */

var newProduct = create({
  name: 'Pork Pudding',
  price: 0.99,
  onSale: true
});

update(newProduct.id, { price: 1.22, onSale: false });

var result = findOne(newProduct.id);

console.log(result);



