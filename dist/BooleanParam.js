'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Param2 = require('./Param');

var _Param3 = _interopRequireDefault(_Param2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cast(value) {
  if (typeof value !== 'boolean') throw new Error('Invalid value for boolean parameter "' + value + '"');

  return !!value;
}

var template = ['type', 'default'];

/**
 * Parameter representing a `boolean` value.
 * @private
 */

var BooleanParam = function (_Param) {
  _inherits(BooleanParam, _Param);

  function BooleanParam(name, definition, value) {
    _classCallCheck(this, BooleanParam);

    value = cast(value);
    return _possibleConstructorReturn(this, (BooleanParam.__proto__ || Object.getPrototypeOf(BooleanParam)).call(this, name, template, definition, value));
  }

  _createClass(BooleanParam, [{
    key: 'setValue',
    value: function setValue(value) {
      _get(BooleanParam.prototype.__proto__ || Object.getPrototypeOf(BooleanParam.prototype), 'setValue', this).call(this, value);

      value = cast(value);

      if (this.value !== value) {
        this.value = value;
        return true;
      }

      return false;
    }
  }]);

  return BooleanParam;
}(_Param3.default);

exports.default = BooleanParam;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJvb2xlYW5QYXJhbS5qcyJdLCJuYW1lcyI6WyJjYXN0IiwidmFsdWUiLCJFcnJvciIsInRlbXBsYXRlIiwiQm9vbGVhblBhcmFtIiwibmFtZSIsImRlZmluaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxLQUFkLEVBQXFCO0FBQ25CLE1BQUksT0FBT0EsS0FBUCxLQUFpQixTQUFyQixFQUNFLE1BQU0sSUFBSUMsS0FBSiwyQ0FBa0RELEtBQWxELE9BQU47O0FBRUYsU0FBTyxDQUFDLENBQUNBLEtBQVQ7QUFDRDs7QUFFRCxJQUFNRSxXQUFXLENBQUMsTUFBRCxFQUFTLFNBQVQsQ0FBakI7O0FBRUE7Ozs7O0lBSU1DLFk7OztBQUNKLHdCQUFZQyxJQUFaLEVBQWtCQyxVQUFsQixFQUE4QkwsS0FBOUIsRUFBcUM7QUFBQTs7QUFDbkNBLFlBQVFELEtBQUtDLEtBQUwsQ0FBUjtBQURtQyx1SEFFN0JJLElBRjZCLEVBRXZCRixRQUZ1QixFQUViRyxVQUZhLEVBRURMLEtBRkM7QUFHcEM7Ozs7NkJBRVFBLEssRUFBTztBQUNkLDJIQUFlQSxLQUFmOztBQUVBQSxjQUFRRCxLQUFLQyxLQUFMLENBQVI7O0FBRUEsVUFBSSxLQUFLQSxLQUFMLEtBQWVBLEtBQW5CLEVBQTBCO0FBQ3hCLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU8sS0FBUDtBQUNEOzs7Ozs7a0JBR1lHLFkiLCJmaWxlIjoiQm9vbGVhblBhcmFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcmFtIGZyb20gJy4vUGFyYW0nO1xuXG5mdW5jdGlvbiBjYXN0KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGJvb2xlYW4gcGFyYW1ldGVyIFwiJHt2YWx1ZX1cImApO1xuXG4gIHJldHVybiAhIXZhbHVlO1xufVxuXG5jb25zdCB0ZW1wbGF0ZSA9IFsndHlwZScsICdkZWZhdWx0J11cblxuLyoqXG4gKiBQYXJhbWV0ZXIgcmVwcmVzZW50aW5nIGEgYGJvb2xlYW5gIHZhbHVlLlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQm9vbGVhblBhcmFtIGV4dGVuZHMgUGFyYW0ge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZWZpbml0aW9uLCB2YWx1ZSkge1xuICAgIHZhbHVlID0gY2FzdCh2YWx1ZSk7XG4gICAgc3VwZXIobmFtZSwgdGVtcGxhdGUsIGRlZmluaXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgc3VwZXIuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgdmFsdWUgPSBjYXN0KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvb2xlYW5QYXJhbTtcbiJdfQ==