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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhcmFtLmpzIl0sIm5hbWVzIjpbIlBhcmFtIiwibmFtZSIsImRlZmluaXRpb25UZW1wbGF0ZSIsInR5cGVDaGVja0Z1bmN0aW9uIiwiZGVmaW5pdGlvbiIsInZhbHVlIiwiZm9yRWFjaCIsImtleSIsImhhc093blByb3BlcnR5IiwiRXJyb3IiLCJ0eXBlIiwiX3R5cGVDaGVja0Z1bmN0aW9uIiwiY29uc3RhbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBWU1BLEs7QUFDSixpQkFBWUMsSUFBWixFQUFrQkMsa0JBQWxCLEVBQXNDQyxpQkFBdEMsRUFBeURDLFVBQXpELEVBQXFFQyxLQUFyRSxFQUE0RTtBQUFBOztBQUMxRUgsdUJBQW1CSSxPQUFuQixDQUEyQixVQUFTQyxHQUFULEVBQWM7QUFDdkMsVUFBSUgsV0FBV0ksY0FBWCxDQUEwQkQsR0FBMUIsTUFBbUMsS0FBdkMsRUFDRSxNQUFNLElBQUlFLEtBQUoscUNBQTJDUixJQUEzQyxZQUFxRE0sR0FBckQscUJBQU47QUFDSCxLQUhEOztBQUtBLFNBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtTLElBQUwsR0FBWU4sV0FBV00sSUFBdkI7QUFDQSxTQUFLTixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUYsa0JBQWtCRSxLQUFsQixFQUF5QkQsVUFBekIsRUFBcUNILElBQXJDLENBQWI7QUFDQSxTQUFLVSxrQkFBTCxHQUEwQlIsaUJBQTFCO0FBQ0Q7Ozs7K0JBRVU7QUFDVCxhQUFPLEtBQUtFLEtBQVo7QUFDRDs7OzZCQUVRQSxLLEVBQU87QUFDZCxVQUFJLEtBQUtELFVBQUwsQ0FBZ0JRLFFBQWhCLEtBQTZCLElBQWpDLEVBQ0UsTUFBTSxJQUFJSCxLQUFKLDhDQUFvRCxLQUFLUixJQUF6RCxRQUFOOztBQUVGSSxjQUFRLEtBQUtNLGtCQUFMLENBQXdCTixLQUF4QixFQUErQixLQUFLRCxVQUFwQyxFQUFnRCxLQUFLSCxJQUFyRCxDQUFSOztBQUVBLFVBQUksS0FBS0ksS0FBTCxLQUFlQSxLQUFuQixFQUEwQjtBQUN4QixhQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQVA7QUFDRDs7Ozs7O2tCQUdZTCxLIiwiZmlsZSI6IlBhcmFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHR5cGVkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBkZWZpbml0aW9uVGVtcGxhdGUgLSBMaXN0IG9mIG1hbmRhdG9yeSBrZXlzIGluIHRoZSBwYXJhbVxuICogIGRlZmluaXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0eXBlQ2hlY2tGdW5jdGlvbiAtIEZ1bmN0aW9uIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gY2hlY2tcbiAqICB0aGUgdmFsdWUgYWdhaW5zdCB0aGUgcGFyYW0gZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZpbml0aW9uIC0gRGVmaW5pdGlvbiBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBWYWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgUGFyYW0ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZWZpbml0aW9uVGVtcGxhdGUsIHR5cGVDaGVja0Z1bmN0aW9uLCBkZWZpbml0aW9uLCB2YWx1ZSkge1xuICAgIGRlZmluaXRpb25UZW1wbGF0ZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGRlZmluaXRpb24uaGFzT3duUHJvcGVydHkoa2V5KSA9PT0gZmFsc2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBkZWZpbml0aW9uIGZvciBwYXJhbSBcIiR7bmFtZX1cIiwgJHtrZXl9IGlzIG5vdCBkZWZpbmVkYCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudHlwZSA9IGRlZmluaXRpb24udHlwZTtcbiAgICB0aGlzLmRlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuICAgIHRoaXMudmFsdWUgPSB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSk7XG4gICAgdGhpcy5fdHlwZUNoZWNrRnVuY3Rpb24gPSB0eXBlQ2hlY2tGdW5jdGlvbjtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZWZpbml0aW9uLmNvbnN0YW50ID09PSB0cnVlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFzc2lnbmVtZW50IHRvIGNvbnN0YW50IHBhcmFtIFwiJHt0aGlzLm5hbWV9XCJgKTtcblxuICAgIHZhbHVlID0gdGhpcy5fdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIHRoaXMuZGVmaW5pdGlvbiwgdGhpcy5uYW1lKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcmFtO1xuIl19