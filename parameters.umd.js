(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for typed parameters.
 *
 * @param {String} name - Name of the parameter.
 * @param {Array} definitionTemplate - List of mandatory keys in the param
 *  definition.
 * @param {Function} typeCheckFunction - Function to be used in order to check
 *  the value against the param definition.
 * @param {Object} definition - Definition of the parameter.
 * @param {Mixed} value - Value of the parameter.
 * @private
 */
var Param = function () {
  function Param(name, definitionTemplate, typeCheckFunction, definition, value) {
    _classCallCheck(this, Param);

    definitionTemplate.forEach(function (key) {
      if (definition.hasOwnProperty(key) === false) throw new Error("Invalid definition for param \"" + name + "\", " + key + " is not defined");
    });

    this.name = name;
    this.type = definition.type;
    this.definition = definition;
    this.value = typeCheckFunction(value, definition, name);
    this._typeCheckFunction = typeCheckFunction;
  }

  _createClass(Param, [{
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this.definition.constant === true) throw new Error("Invalid assignement to constant param \"" + this.name + "\"");

      value = this._typeCheckFunction(value, this.definition, this.name);

      if (this.value !== value) {
        this.value = value;
        return true;
      }

      return false;
    }
  }]);

  return Param;
}();

exports.default = Param;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Bag of parameters. Main interface of the library
 * @param {Object} params - Object containing the params instances.
 */
var ParameterBag = function () {
  function ParameterBag(params, definitions) {
    _classCallCheck(this, ParameterBag);

    /**
     * List of parameters.
     * @type {Object<String, Param>}
     * @name _params
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._params = params;

    /**
     * List of definitions with init values.
     * @type {Object<String, paramDefinition>}
     * @name _definitions
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._definitions = definitions;

    /**
     * List of global listeners.
     * @type {Set}
     * @name _globalListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._globalListeners = new Set();

    /**
     * List of params listeners.
     * @type {Object<String, Set>}
     * @name _paramsListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._paramsListeners = {};

    // initialize empty Set for each param
    for (var name in params) {
      this._paramsListeners[name] = new Set();
    }
  }

  _createClass(ParameterBag, [{
    key: "getDefinitions",
    value: function getDefinitions() {
      return this._definitions;
    }

    /**
     * Return the value of the given parameter.
     * @param {String} name - Name of the parameter.
     */

  }, {
    key: "get",
    value: function get(name) {
      return this._params[name].value;
    }

    /**
     * Set the value of a parameter. If the value of the parameter is updated
     * (aka if previous value is different from new value) all registered
     * callbacks are registered.
     * @param {String} name - Name of the parameter.
     * @param {Mixed} value - Value of the parameter.
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var param = this._params[name];
      var updated = param.setValue(value);
      value = param.getValue();

      if (updated) {
        var metas = param.definition.metas;
        // trigger global listeners
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._globalListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener(name, value, metas);
          } // trigger param listeners
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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._paramsListeners[name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _listener = _step2.value;

            _listener(value, metas);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return value;
    }

    /**
     * Reset a parameter to it's init value. Reset all if name is `null`
     * @param {String}
     */

  }, {
    key: "reset",
    value: function reset() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (name !== null) {
        var param = this._params[name];
        param.setValue(param.definition.initValue);
      } else {
        for (var _name in this._params) {
          this.reset(_name);
        }
      }
    }

    /**
     * @callback ParameterBag~listenerCallback
     * @param {String} name - Parameter name.
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to all param updates.
     * @param {ParameterBag~listenerCallack} callback - Listener to register.
     */

  }, {
    key: "addListener",
    value: function addListener(callback) {
      this._globalListeners.add(callback);
    }

    /**
     * Remove listener from all param changes.
     * @param {ParameterBag~listenerCallack} callback - Listener to remove. If
     *  `null` remove all listeners.
     */

  }, {
    key: "removeListener",
    value: function removeListener() {
      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (callback === null) this._globalListeners.clear();else this._globalListeners.delete(callback);
    }

    /**
     * @callback ParameterBag~paramListenerCallack
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to a given param updates.
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Function to apply
     *  when the value of the parameter changes.
     */

  }, {
    key: "addParamListener",
    value: function addParamListener(name, callback) {
      this._paramsListeners[name].add(callback);
    }

    /**
     * Remove listener from a given param updates.
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Listener to remove.
     *  If `null` remove all listeners.
     */

  }, {
    key: "removeParamListener",
    value: function removeParamListener(name) {
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (callback === null) this._paramsListeners[name].clear();else this._paramsListeners[name].delete(callback);
    }
  }]);

  return ParameterBag;
}();

exports.default = ParameterBag;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var min = Math.min;
var max = Math.max;

function clip(value) {
  var lower = arguments.length <= 1 || arguments[1] === undefined ? -Infinity : arguments[1];
  var upper = arguments.length <= 2 || arguments[2] === undefined ? +Infinity : arguments[2];

  return max(lower, min(upper, value));
}

/**
 *
 *
 */
exports.default = {
  boolean: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'boolean') throw new Error('Invalid value for boolean param "' + name + '": ' + value);

      return value;
    }
  },
  integer: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (!(typeof value === 'number' && Math.floor(value) === value)) throw new Error('Invalid value for integer param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },
  float: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'number' || value !== value) // reject NaN
        throw new Error('Invalid value for float param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },
  string: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'string') throw new Error('Invalid value for string param "' + name + '": ' + value);

      return value;
    }
  },
  enum: {
    definitionTemplate: ['default', 'list'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (definition.list.indexOf(value) === -1) throw new Error('Invalid value for enum param "' + name + '": ' + value);

      return value;
    }
  }
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ParameterBag = require('./ParameterBag');

var _ParameterBag2 = _interopRequireDefault(_ParameterBag);

var _Param = require('./Param');

var _Param2 = _interopRequireDefault(_Param);

var _parameterTemplates = require('./parameterTemplates');

var _parameterTemplates2 = _interopRequireDefault(_parameterTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Factory for the `ParameterBag` class
 *
 */

/**
 * @typedef {Object} booleanDefinition
 * @property {String} [type='boolean'] - Define a boolean parameter.
 * @property {Boolean} default - Default value of the parameter.
 * @property {Boolean} [constant=false] - Define if the parameter is constant.
 * @property {Object} [metas={}] - Optionnal metadata of the parameter.
 */
function parameters(definitions) {
  var values = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var params = {};

  for (var name in values) {
    if (definitions.hasOwnProperty(name) === false) throw new Error('Definition not found for param "' + name + '"');
  }

  for (var _name in definitions) {
    if (params.hasOwnProperty(_name) === true) throw new Error('Parameter "' + _name + '" already defined');

    var definition = definitions[_name];
    var _dictionnary$definiti = _parameterTemplates2.default[definition.type];
    var definitionTemplate = _dictionnary$definiti.definitionTemplate;
    var typeCheckFunction = _dictionnary$definiti.typeCheckFunction;


    var value = void 0;

    if (values.hasOwnProperty(_name) === true) value = values[_name];else value = definition.default;

    // store init value in definition
    definition.initValue = value;

    if (!typeCheckFunction || !definitionTemplate) throw new Error('Unknown param type "' + definition.type + '"');

    params[_name] = new _Param2.default(_name, definitionTemplate, typeCheckFunction, definition, value);
  }

  return new _ParameterBag2.default(params, definitions);
}

/**
 * Register a new type for the `parameters` factory.
 * @param {String} typeName - Value that will be available as the `type` of a
 *  param definition.
 * @param {parameterDefinition} parameterDefinition - Object describing the
 *  parameter.
 */
parameters.defineType = function (typeName, parameterDefinition) {
  _parameterTemplates2.default[typeName] = parameterDefinition;
};

exports.default = parameters;

},{"./Param":1,"./ParameterBag":2,"./parameterTemplates":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L1BhcmFtLmpzIiwiZGlzdC9QYXJhbWV0ZXJCYWcuanMiLCJkaXN0L3BhcmFtZXRlclRlbXBsYXRlcy5qcyIsImRpc3QvcGFyYW1ldGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNDQTs7Ozs7Ozs7Ozs7O0lBWU0sSztBQUNKLGlCQUFZLElBQVosRUFBa0Isa0JBQWxCLEVBQXNDLGlCQUF0QyxFQUF5RCxVQUF6RCxFQUFxRSxLQUFyRSxFQUE0RTtBQUFBOztBQUMxRSx1QkFBbUIsT0FBbkIsQ0FBMkIsVUFBUyxHQUFULEVBQWM7QUFDdkMsVUFBSSxXQUFXLGNBQVgsQ0FBMEIsR0FBMUIsTUFBbUMsS0FBdkMsRUFDRSxNQUFNLElBQUksS0FBSixxQ0FBMkMsSUFBM0MsWUFBcUQsR0FBckQscUJBQU47QUFDSCxLQUhEOztBQUtBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxXQUFXLElBQXZCO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsa0JBQWtCLEtBQWxCLEVBQXlCLFVBQXpCLEVBQXFDLElBQXJDLENBQWI7QUFDQSxTQUFLLGtCQUFMLEdBQTBCLGlCQUExQjtBQUNEOzs7OytCQUVVO0FBQ1QsYUFBTyxLQUFLLEtBQVo7QUFDRDs7OzZCQUVRLEssRUFBTztBQUNkLFVBQUksS0FBSyxVQUFMLENBQWdCLFFBQWhCLEtBQTZCLElBQWpDLEVBQ0UsTUFBTSxJQUFJLEtBQUosOENBQW9ELEtBQUssSUFBekQsUUFBTjs7QUFFRixjQUFRLEtBQUssa0JBQUwsQ0FBd0IsS0FBeEIsRUFBK0IsS0FBSyxVQUFwQyxFQUFnRCxLQUFLLElBQXJELENBQVI7O0FBRUEsVUFBSSxLQUFLLEtBQUwsS0FBZSxLQUFuQixFQUEwQjtBQUN4QixhQUFL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QUFOO0FBQ0g7O0FBRUQsT0FBSyxJQUFJLEtBQVQsSUFBaUIsV0FBakIsRUFBOEI7QUFDNUIsUUFBSSxPQUFPLGNBQVAsQ0FBc0IsS0FBdEIsTUFBZ0MsSUFBcEMsRUFDRSxNQUFNLElBQUksS0FBSixpQkFBd0IsS0FBeEIsdUJBQU47O0FBRUYsUUFBTSxhQUFhLFlBQVksS0FBWixDQUFuQjtBQUo0QixnQ0FReEIsNkJBQVksV0FBVyxJQUF2QixDQVJ3QjtBQUFBLFFBTTFCLGtCQU4wQix5QkFNMUIsa0JBTjBCO0FBQUEsUUFPMUIsaUJBUDBCLHlCQU8xQixpQkFQMEI7OztBQVU1QixRQUFJLGNBQUo7O0FBRUEsUUFBSSxPQUFPLGNBQVAsQ0FBc0IsS0FBdEIsTUFBZ0MsSUFBcEMsRUFDRSxRQUFRLE9BQU8sS0FBUCxDQUFSLENBREYsS0FHRSxRQUFRLFdBQVcsT0FBbkI7O0FBRUY7QUFDQSxlQUFXLFNBQVgsR0FBdUIsS0FBdkI7O0FBRUEsUUFBSSxDQUFDLGlCQUFELElBQXNCLENBQUMsa0JBQTNCLEVBQ0UsTUFBTSxJQUFJLEtBQUosMEJBQWlDLFdBQVcsSUFBNUMsT0FBTjs7QUFFRixXQUFPLEtBQVAsSUFBZSxvQkFBVSxLQUFWLEVBQWdCLGtCQUFoQixFQUFvQyxpQkFBcEMsRUFBdUQsVUFBdkQsRUFBbUUsS0FBbkUsQ0FBZjtBQUNEOztBQUVELFNBQU8sMkJBQWlCLE1BQWpCLEVBQXlCLFdBQXpCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFdBQVcsVUFBWCxHQUF3QixVQUFTLFFBQVQsRUFBbUIsbUJBQW5CLEVBQXdDO0FBQzlELCtCQUFZLFFBQVosSUFBd0IsbUJBQXhCO0FBQ0QsQ0FGRDs7a0JBSWUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgdHlwZWQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGRlZmluaXRpb25UZW1wbGF0ZSAtIExpc3Qgb2YgbWFuZGF0b3J5IGtleXMgaW4gdGhlIHBhcmFtXG4gKiAgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHR5cGVDaGVja0Z1bmN0aW9uIC0gRnVuY3Rpb24gdG8gYmUgdXNlZCBpbiBvcmRlciB0byBjaGVja1xuICogIHRoZSB2YWx1ZSBhZ2FpbnN0IHRoZSBwYXJhbSBkZWZpbml0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmluaXRpb24gLSBEZWZpbml0aW9uIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBQYXJhbSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlZmluaXRpb25UZW1wbGF0ZSwgdHlwZUNoZWNrRnVuY3Rpb24sIGRlZmluaXRpb24sIHZhbHVlKSB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5oYXNPd25Qcm9wZXJ0eShrZXkpID09PSBmYWxzZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGRlZmluaXRpb24gZm9yIHBhcmFtIFwiJHtuYW1lfVwiLCAke2tleX0gaXMgbm90IGRlZmluZWRgKTtcbiAgICB9KTtcblxuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gZGVmaW5pdGlvbi50eXBlO1xuICAgIHRoaXMuZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG4gICAgdGhpcy52YWx1ZSA9IHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKTtcbiAgICB0aGlzLl90eXBlQ2hlY2tGdW5jdGlvbiA9IHR5cGVDaGVja0Z1bmN0aW9uO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlZmluaXRpb24uY29uc3RhbnQgPT09IHRydWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXNzaWduZW1lbnQgdG8gY29uc3RhbnQgcGFyYW0gXCIke3RoaXMubmFtZX1cImApO1xuXG4gICAgdmFsdWUgPSB0aGlzLl90eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgdGhpcy5kZWZpbml0aW9uLCB0aGlzLm5hbWUpO1xuXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFyYW07XG4iLCJcbi8qKlxuICogQmFnIG9mIHBhcmFtZXRlcnMuIE1haW4gaW50ZXJmYWNlIG9mIHRoZSBsaWJyYXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBhcmFtcyBpbnN0YW5jZXMuXG4gKi9cbmNsYXNzIFBhcmFtZXRlckJhZyB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcywgZGVmaW5pdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHBhcmFtZXRlcnMuXG4gICAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIFBhcmFtPn1cbiAgICAgKiBAbmFtZSBfcGFyYW1zXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBkZWZpbml0aW9ucyB3aXRoIGluaXQgdmFsdWVzLlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBwYXJhbURlZmluaXRpb24+fVxuICAgICAqIEBuYW1lIF9kZWZpbml0aW9uc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gZGVmaW5pdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGdsb2JhbCBsaXN0ZW5lcnMuXG4gICAgICogQHR5cGUge1NldH1cbiAgICAgKiBAbmFtZSBfZ2xvYmFsTGlzdGVuZXJzXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzID0gbmV3IFNldCgpO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBwYXJhbXMgbGlzdGVuZXJzLlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBTZXQ+fVxuICAgICAqIEBuYW1lIF9wYXJhbXNMaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnMgPSB7fTtcblxuICAgIC8vIGluaXRpYWxpemUgZW1wdHkgU2V0IGZvciBlYWNoIHBhcmFtXG4gICAgZm9yIChsZXQgbmFtZSBpbiBwYXJhbXMpXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0gPSBuZXcgU2V0KCk7XG4gIH1cblxuICBnZXREZWZpbml0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtc1tuYW1lXS52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIGEgcGFyYW1ldGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBpcyB1cGRhdGVkXG4gICAqIChha2EgaWYgcHJldmlvdXMgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gbmV3IHZhbHVlKSBhbGwgcmVnaXN0ZXJlZFxuICAgKiBjYWxsYmFja3MgYXJlIHJlZ2lzdGVyZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IHRoaXMuX3BhcmFtc1tuYW1lXTtcbiAgICBjb25zdCB1cGRhdGVkID0gcGFyYW0uc2V0VmFsdWUodmFsdWUpO1xuICAgIHZhbHVlID0gcGFyYW0uZ2V0VmFsdWUoKTtcblxuICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICBjb25zdCBtZXRhcyA9IHBhcmFtLmRlZmluaXRpb24ubWV0YXM7XG4gICAgICAvLyB0cmlnZ2VyIGdsb2JhbCBsaXN0ZW5lcnNcbiAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMuX2dsb2JhbExpc3RlbmVycylcbiAgICAgICAgbGlzdGVuZXIobmFtZSwgdmFsdWUsIG1ldGFzKTtcblxuICAgICAgLy8gdHJpZ2dlciBwYXJhbSBsaXN0ZW5lcnNcbiAgICAgIGZvciAobGV0IGxpc3RlbmVyIG9mIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXSlcbiAgICAgICAgbGlzdGVuZXIodmFsdWUsIG1ldGFzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYSBwYXJhbWV0ZXIgdG8gaXQncyBpbml0IHZhbHVlLiBSZXNldCBhbGwgaWYgbmFtZSBpcyBgbnVsbGBcbiAgICogQHBhcmFtIHtTdHJpbmd9XG4gICAqL1xuICByZXNldChuYW1lID0gbnVsbCkge1xuICAgIGlmIChuYW1lICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwYXJhbSA9IHRoaXMuX3BhcmFtc1tuYW1lXTtcbiAgICAgIHBhcmFtLnNldFZhbHVlKHBhcmFtLmRlZmluaXRpb24uaW5pdFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzLl9wYXJhbXMpXG4gICAgICAgIHRoaXMucmVzZXQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYmFja1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFVwZGF0ZWQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IFttZXRhPV0gLSBHaXZlbiBtZXRhIGRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciB0byBhbGwgcGFyYW0gdXBkYXRlcy5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlZ2lzdGVyLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbGlzdGVuZXIgZnJvbSBhbGwgcGFyYW0gY2hhbmdlcy5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlbW92ZS4gSWZcbiAgICogIGBudWxsYCByZW1vdmUgYWxsIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbClcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5jbGVhcigpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5kZWxldGUoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBVcGRhdGVkIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbbWV0YT1dIC0gR2l2ZW4gbWV0YSBkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBZGQgbGlzdGVuZXIgdG8gYSBnaXZlbiBwYXJhbSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja30gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBhcHBseVxuICAgKiAgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBjaGFuZ2VzLlxuICAgKi9cbiAgYWRkUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsaXN0ZW5lciBmcm9tIGEgZ2l2ZW4gcGFyYW0gdXBkYXRlcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgKiAgSWYgYG51bGxgIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoY2FsbGJhY2sgPT09IG51bGwpXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uY2xlYXIoKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uZGVsZXRlKGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJhbWV0ZXJCYWc7XG4iLCJcbmNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5cbmZ1bmN0aW9uIGNsaXAodmFsdWUsIGxvd2VyID0gLUluZmluaXR5LCB1cHBlciA9ICtJbmZpbml0eSkge1xuICByZXR1cm4gbWF4KGxvd2VyLCBtaW4odXBwZXIsIHZhbHVlKSlcbn1cblxuLyoqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBib29sZWFuOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGJvb2xlYW4gcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG4gIGludGVnZXI6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgaW50ZWdlciBwYXJhbSBcIiR7bmFtZX1cIjogJHt2YWx1ZX1gKTtcblxuICAgICAgcmV0dXJuIGNsaXAodmFsdWUsIGRlZmluaXRpb24ubWluLCBkZWZpbml0aW9uLm1heCk7XG4gICAgfVxuICB9LFxuICBmbG9hdDoge1xuICAgIGRlZmluaXRpb25UZW1wbGF0ZTogWydkZWZhdWx0J10sXG4gICAgdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8wqB2YWx1ZSAhPT0gdmFsdWUpIC8vIHJlamVjdCBOYU5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBmbG9hdCBwYXJhbSBcIiR7bmFtZX1cIjogJHt2YWx1ZX1gKTtcblxuICAgICAgcmV0dXJuIGNsaXAodmFsdWUsIGRlZmluaXRpb24ubWluLCBkZWZpbml0aW9uLm1heCk7XG4gICAgfVxuICB9LFxuICBzdHJpbmc6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBzdHJpbmcgcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG4gIGVudW06IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCcsICdsaXN0J10sXG4gICAgdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpIHtcbiAgICAgIGlmIChkZWZpbml0aW9uLmxpc3QuaW5kZXhPZih2YWx1ZSkgPT09IC0xKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGVudW0gcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuIiwiaW1wb3J0IFBhcmFtZXRlckJhZyBmcm9tICcuL1BhcmFtZXRlckJhZyc7XG5pbXBvcnQgUGFyYW0gZnJvbSAnLi9QYXJhbSc7XG5pbXBvcnQgZGljdGlvbm5hcnkgZnJvbSAnLi9wYXJhbWV0ZXJUZW1wbGF0ZXMnO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIHRoZSBgUGFyYW1ldGVyQmFnYCBjbGFzc1xuICpcbiAqL1xuXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gYm9vbGVhbkRlZmluaXRpb25cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nYm9vbGVhbiddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKi9cbmZ1bmN0aW9uIHBhcmFtZXRlcnMoZGVmaW5pdGlvbnMsIHZhbHVlcyA9IHt9KSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gIGZvciAobGV0IG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLmhhc093blByb3BlcnR5KG5hbWUpID09PSBmYWxzZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVmaW5pdGlvbiBub3QgZm91bmQgZm9yIHBhcmFtIFwiJHtuYW1lfVwiYCk7XG4gIH1cblxuICBmb3IgKGxldCBuYW1lIGluIGRlZmluaXRpb25zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA9PT0gdHJ1ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtuYW1lfVwiIGFscmVhZHkgZGVmaW5lZGApO1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGRlZmluaXRpb25zW25hbWVdO1xuICAgIGNvbnN0IHtcbiAgICAgIGRlZmluaXRpb25UZW1wbGF0ZSxcbiAgICAgIHR5cGVDaGVja0Z1bmN0aW9uXG4gICAgfSA9IGRpY3Rpb25uYXJ5W2RlZmluaXRpb24udHlwZV07XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KG5hbWUpID09PSB0cnVlKVxuICAgICAgdmFsdWUgPSB2YWx1ZXNbbmFtZV07XG4gICAgZWxzZVxuICAgICAgdmFsdWUgPSBkZWZpbml0aW9uLmRlZmF1bHQ7XG5cbiAgICAvLyBzdG9yZSBpbml0IHZhbHVlIGluIGRlZmluaXRpb25cbiAgICBkZWZpbml0aW9uLmluaXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKCF0eXBlQ2hlY2tGdW5jdGlvbiB8fMKgIWRlZmluaXRpb25UZW1wbGF0ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSB0eXBlIFwiJHtkZWZpbml0aW9uLnR5cGV9XCJgKTtcblxuICAgIHBhcmFtc1tuYW1lXSA9IG5ldyBQYXJhbShuYW1lLCBkZWZpbml0aW9uVGVtcGxhdGUsIHR5cGVDaGVja0Z1bmN0aW9uLCBkZWZpbml0aW9uLCB2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFBhcmFtZXRlckJhZyhwYXJhbXMsIGRlZmluaXRpb25zKTtcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyB0eXBlIGZvciB0aGUgYHBhcmFtZXRlcnNgIGZhY3RvcnkuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZU5hbWUgLSBWYWx1ZSB0aGF0IHdpbGwgYmUgYXZhaWxhYmxlIGFzIHRoZSBgdHlwZWAgb2YgYVxuICogIHBhcmFtIGRlZmluaXRpb24uXG4gKiBAcGFyYW0ge3BhcmFtZXRlckRlZmluaXRpb259IHBhcmFtZXRlckRlZmluaXRpb24gLSBPYmplY3QgZGVzY3JpYmluZyB0aGVcbiAqICBwYXJhbWV0ZXIuXG4gKi9cbnBhcmFtZXRlcnMuZGVmaW5lVHlwZSA9IGZ1bmN0aW9uKHR5cGVOYW1lLCBwYXJhbWV0ZXJEZWZpbml0aW9uKSB7XG4gIGRpY3Rpb25uYXJ5W3R5cGVOYW1lXSA9IHBhcmFtZXRlckRlZmluaXRpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcmFtZXRlcnM7XG4iXX0=
