const _ = require('underscore');

function _tacoParse(int) {
  let tacos = '';
  for (let i = 0; i < int; i++) {
    tacos += '🌮';
  }
  return tacos;
}

function _update(obj, ...objs) {
  const result = obj;
  _.each(objs, v => {
    _.each(v, (v, k) => {
      if (result[k]) result[k] = v;
    });
  });
  return result;
}

module.exports = { _tacoParse, _update };
