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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhcmFtZXRlckJhZy5qcyJdLCJuYW1lcyI6WyJQYXJhbWV0ZXJCYWciLCJwYXJhbXMiLCJkZWZpbml0aW9ucyIsIl9wYXJhbXMiLCJfZGVmaW5pdGlvbnMiLCJfZ2xvYmFsTGlzdGVuZXJzIiwiU2V0IiwiX3BhcmFtc0xpc3RlbmVycyIsIm5hbWUiLCJ2YWx1ZSIsInBhcmFtIiwidXBkYXRlZCIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJtZXRhcyIsImRlZmluaXRpb24iLCJsaXN0ZW5lciIsImluaXRWYWx1ZSIsInJlc2V0IiwiY2FsbGJhY2siLCJhZGQiLCJjbGVhciIsImRlbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0lBSU1BLFk7QUFDSix3QkFBWUMsTUFBWixFQUFvQkMsV0FBcEIsRUFBaUM7QUFBQTs7QUFDL0I7Ozs7Ozs7O0FBUUEsU0FBS0MsT0FBTCxHQUFlRixNQUFmOztBQUVBOzs7Ozs7OztBQVFBLFNBQUtHLFlBQUwsR0FBb0JGLFdBQXBCOztBQUVBOzs7Ozs7OztBQVFBLFNBQUtHLGdCQUFMLEdBQXdCLElBQUlDLEdBQUosRUFBeEI7O0FBRUE7Ozs7Ozs7O0FBUUEsU0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7O0FBRUE7QUFDQSxTQUFLLElBQUlDLElBQVQsSUFBaUJQLE1BQWpCO0FBQ0UsV0FBS00sZ0JBQUwsQ0FBc0JDLElBQXRCLElBQThCLElBQUlGLEdBQUosRUFBOUI7QUFERjtBQUVEOzs7O3FDQUVnQjtBQUNmLGFBQU8sS0FBS0YsWUFBWjtBQUNEOztBQUVEOzs7Ozs7O3dCQUlJSSxJLEVBQU07QUFDUixhQUFPLEtBQUtMLE9BQUwsQ0FBYUssSUFBYixFQUFtQkMsS0FBMUI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozt3QkFPSUQsSSxFQUFNQyxLLEVBQU87QUFDZixVQUFNQyxRQUFRLEtBQUtQLE9BQUwsQ0FBYUssSUFBYixDQUFkO0FBQ0EsVUFBTUcsVUFBVUQsTUFBTUUsUUFBTixDQUFlSCxLQUFmLENBQWhCO0FBQ0FBLGNBQVFDLE1BQU1HLFFBQU4sRUFBUjs7QUFFQSxVQUFJRixPQUFKLEVBQWE7QUFDWCxZQUFNRyxRQUFRSixNQUFNSyxVQUFOLENBQWlCRCxLQUEvQjtBQUNBO0FBRlc7QUFBQTtBQUFBOztBQUFBO0FBR1gsK0JBQXFCLEtBQUtULGdCQUExQjtBQUFBLGdCQUFTVyxRQUFUOztBQUNFQSxxQkFBU1IsSUFBVCxFQUFlQyxLQUFmLEVBQXNCSyxLQUF0QjtBQURGLFdBSFcsQ0FNWDtBQU5XO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBT1gsZ0NBQXFCLEtBQUtQLGdCQUFMLENBQXNCQyxJQUF0QixDQUFyQjtBQUFBLGdCQUFTUSxTQUFUOztBQUNFQSxzQkFBU1AsS0FBVCxFQUFnQkssS0FBaEI7QUFERjtBQVBXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTWjs7QUFFRCxhQUFPTCxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7NEJBSW1CO0FBQUEsVUFBYkQsSUFBYSx5REFBTixJQUFNOztBQUNqQixVQUFJQSxTQUFTLElBQWIsRUFBbUI7QUFDakIsWUFBTUUsUUFBUSxLQUFLUCxPQUFMLENBQWFLLElBQWIsQ0FBZDtBQUNBRSxjQUFNRSxRQUFOLENBQWVGLE1BQU1LLFVBQU4sQ0FBaUJFLFNBQWhDO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBSyxJQUFJVCxLQUFULElBQWlCLEtBQUtMLE9BQXRCO0FBQ0UsZUFBS2UsS0FBTCxDQUFXVixLQUFYO0FBREY7QUFFRDtBQUNGOztBQUVEOzs7Ozs7O0FBT0E7Ozs7Ozs7Z0NBSVlXLFEsRUFBVTtBQUNwQixXQUFLZCxnQkFBTCxDQUFzQmUsR0FBdEIsQ0FBMEJELFFBQTFCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3FDQUtnQztBQUFBLFVBQWpCQSxRQUFpQix5REFBTixJQUFNOztBQUM5QixVQUFJQSxhQUFhLElBQWpCLEVBQ0UsS0FBS2QsZ0JBQUwsQ0FBc0JnQixLQUF0QixHQURGLEtBR0UsS0FBS2hCLGdCQUFMLENBQXNCaUIsTUFBdEIsQ0FBNkJILFFBQTdCO0FBQ0g7O0FBRUQ7Ozs7OztBQU1BOzs7Ozs7Ozs7cUNBTWlCWCxJLEVBQU1XLFEsRUFBVTtBQUMvQixXQUFLWixnQkFBTCxDQUFzQkMsSUFBdEIsRUFBNEJZLEdBQTVCLENBQWdDRCxRQUFoQztBQUNEOztBQUVEOzs7Ozs7Ozs7d0NBTW9CWCxJLEVBQXVCO0FBQUEsVUFBakJXLFFBQWlCLHlEQUFOLElBQU07O0FBQ3pDLFVBQUlBLGFBQWEsSUFBakIsRUFDRSxLQUFLWixnQkFBTCxDQUFzQkMsSUFBdEIsRUFBNEJhLEtBQTVCLEdBREYsS0FHRSxLQUFLZCxnQkFBTCxDQUFzQkMsSUFBdEIsRUFBNEJjLE1BQTVCLENBQW1DSCxRQUFuQztBQUNIOzs7Ozs7a0JBR1luQixZIiwiZmlsZSI6IlBhcmFtZXRlckJhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBCYWcgb2YgcGFyYW1ldGVycy4gTWFpbiBpbnRlcmZhY2Ugb2YgdGhlIGxpYnJhcnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBPYmplY3QgY29udGFpbmluZyB0aGUgcGFyYW1zIGluc3RhbmNlcy5cbiAqL1xuY2xhc3MgUGFyYW1ldGVyQmFnIHtcbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZpbml0aW9ucykge1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcGFyYW1ldGVycy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0PFN0cmluZywgUGFyYW0+fVxuICAgICAqIEBuYW1lIF9wYXJhbXNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGRlZmluaXRpb25zIHdpdGggaW5pdCB2YWx1ZXMuXG4gICAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIHBhcmFtRGVmaW5pdGlvbj59XG4gICAgICogQG5hbWUgX2RlZmluaXRpb25zXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBkZWZpbml0aW9ucztcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgZ2xvYmFsIGxpc3RlbmVycy5cbiAgICAgKiBAdHlwZSB7U2V0fVxuICAgICAqIEBuYW1lIF9nbG9iYWxMaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHBhcmFtcyBsaXN0ZW5lcnMuXG4gICAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIFNldD59XG4gICAgICogQG5hbWUgX3BhcmFtc0xpc3RlbmVyc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVycyA9IHt9O1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBlbXB0eSBTZXQgZm9yIGVhY2ggcGFyYW1cbiAgICBmb3IgKGxldCBuYW1lIGluIHBhcmFtcylcbiAgICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXSA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIGdldERlZmluaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zW25hbWVdLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgb2YgYSBwYXJhbWV0ZXIuIElmIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGlzIHVwZGF0ZWRcbiAgICogKGFrYSBpZiBwcmV2aW91cyB2YWx1ZSBpcyBkaWZmZXJlbnQgZnJvbSBuZXcgdmFsdWUpIGFsbCByZWdpc3RlcmVkXG4gICAqIGNhbGxiYWNrcyBhcmUgcmVnaXN0ZXJlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIHNldChuYW1lLCB2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gdGhpcy5fcGFyYW1zW25hbWVdO1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBwYXJhbS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdmFsdWUgPSBwYXJhbS5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgIGNvbnN0IG1ldGFzID0gcGFyYW0uZGVmaW5pdGlvbi5tZXRhcztcbiAgICAgIC8vIHRyaWdnZXIgZ2xvYmFsIGxpc3RlbmVyc1xuICAgICAgZm9yIChsZXQgbGlzdGVuZXIgb2YgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzKVxuICAgICAgICBsaXN0ZW5lcihuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgICAvLyB0cmlnZ2VyIHBhcmFtIGxpc3RlbmVyc1xuICAgICAgZm9yIChsZXQgbGlzdGVuZXIgb2YgdGhpcy5fcGFyYW1zTGlzdGVuZXJzW25hbWVdKVxuICAgICAgICBsaXN0ZW5lcih2YWx1ZSwgbWV0YXMpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhIHBhcmFtZXRlciB0byBpdCdzIGluaXQgdmFsdWUuIFJlc2V0IGFsbCBpZiBuYW1lIGlzIGBudWxsYFxuICAgKiBAcGFyYW0ge1N0cmluZ31cbiAgICovXG4gIHJlc2V0KG5hbWUgPSBudWxsKSB7XG4gICAgaWYgKG5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHBhcmFtID0gdGhpcy5fcGFyYW1zW25hbWVdO1xuICAgICAgcGFyYW0uc2V0VmFsdWUocGFyYW0uZGVmaW5pdGlvbi5pbml0VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBuYW1lIGluIHRoaXMuX3BhcmFtcylcbiAgICAgICAgdGhpcy5yZXNldChuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGNhbGxiYWNrIFBhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxiYWNrXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVXBkYXRlZCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW21ldGE9XSAtIEdpdmVuIG1ldGEgZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cblxuICAvKipcbiAgICogQWRkIGxpc3RlbmVyIHRvIGFsbCBwYXJhbSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVnaXN0ZXIuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xuICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsaXN0ZW5lciBmcm9tIGFsbCBwYXJhbSBjaGFuZ2VzLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35saXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVtb3ZlLiBJZlxuICAgKiAgYG51bGxgIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgaWYgKGNhbGxiYWNrID09PSBudWxsKVxuICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQGNhbGxiYWNrIFBhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFVwZGF0ZWQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IFttZXRhPV0gLSBHaXZlbiBtZXRhIGRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciB0byBhIGdpdmVuIHBhcmFtIHVwZGF0ZXMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyQmFnfnBhcmFtTGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGFwcGx5XG4gICAqICB3aGVuIHRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGNoYW5nZXMuXG4gICAqL1xuICBhZGRQYXJhbUxpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzW25hbWVdLmFkZChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxpc3RlbmVyIGZyb20gYSBnaXZlbiBwYXJhbSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja30gY2FsbGJhY2sgLSBMaXN0ZW5lciB0byByZW1vdmUuXG4gICAqICBJZiBgbnVsbGAgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMuXG4gICAqL1xuICByZW1vdmVQYXJhbUxpc3RlbmVyKG5hbWUsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbClcbiAgICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5jbGVhcigpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5kZWxldGUoY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcmFtZXRlckJhZztcbiJdfQ==