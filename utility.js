function _tacoParse(int) {
  let tacos = '';
  for (let i = 0; i < int; i++) {
    tacos += '🌮';
  }
  return tacos;
}

function _update(obj, ...objs) {
  // result will be based off main object
  const result = obj;
  // for each object...
  _.each(objs, v => {
    // for each property...
    _.each(v, (v, k) => {
      // if result doesn't exist yet
      if (result[k])
        // add result's property
        result[k] = v;
    });
  });
  // return modified object
  return result;
}

module.exports = { _tacoParse, _update };
