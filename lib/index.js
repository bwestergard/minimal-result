'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Ok = exports.Ok = function Ok(data) {
  return { tag: 'Ok', data: data };
};

var Err = exports.Err = function Err(err) {
  return { tag: 'Err', err: err };
};

var andThen = exports.andThen = function andThen(result, f) {
  if (result.tag === 'Ok') {
    return f(result.data);
  } else {
    return Err(result.err);
  }
};

var mapOk = exports.mapOk = function mapOk(result, f) {
  if (result.tag === 'Ok') {
    return Ok(f(result.data));
  } else {
    return Err(result.err);
  }
};

var mapErr = exports.mapErr = function mapErr(result, f) {
  if (result.tag === 'Ok') {
    return Ok(result.data);
  } else {
    return Err(f(result.err));
  }
};

var unwrapOrElse = exports.unwrapOrElse = function unwrapOrElse(result, f) {
  if (result.tag === 'Ok') {
    return result.data;
  } else {
    return f(result.err);
  }
};

var collectResultMap = exports.collectResultMap = function collectResultMap(oldMap, f) {
  var newMap = {};
  for (var label in oldMap) {
    var oldValue = oldMap[label];
    var newValue = f(label, oldValue);
    if (newValue.tag === 'Ok') {
      newMap[label] = newValue.data;
    } else {
      return Err(newValue.err);
    }
  }
  return Ok(newMap);
};

var collectResultArray = exports.collectResultArray = function collectResultArray(oldArray, f) {
  var newArray = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = oldArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var oldValue = _step.value;

      var newValue = f(oldValue);
      if (newValue.tag === 'Ok') {
        newArray.push(newValue.data);
      } else {
        return Err(newValue.err);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Ok(newArray);
};