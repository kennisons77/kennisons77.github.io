import _ from 'lodash';

function mirrorKeys(arr) {
  var obj = {};
  _.each(arr, function setKeys(value) {
    obj[value] = value;
  })

  return obj;
}

export default mirrorKeys;
