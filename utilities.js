'use strict'

exports.defaultEqualityComparer = function (item1, item2) {
  return item1 === item2;
};

exports.defaultPredicate = function(item) {
  return true;
}