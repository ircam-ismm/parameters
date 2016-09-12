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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFtZXRlcnMuanMiXSwibmFtZXMiOlsicGFyYW1ldGVycyIsImRlZmluaXRpb25zIiwidmFsdWVzIiwicGFyYW1zIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiRXJyb3IiLCJkZWZpbml0aW9uIiwidHlwZSIsImRlZmluaXRpb25UZW1wbGF0ZSIsInR5cGVDaGVja0Z1bmN0aW9uIiwidmFsdWUiLCJkZWZhdWx0IiwiaW5pdFZhbHVlIiwiZGVmaW5lVHlwZSIsInR5cGVOYW1lIiwicGFyYW1ldGVyRGVmaW5pdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFNQTs7Ozs7OztBQU9BLFNBQVNBLFVBQVQsQ0FBb0JDLFdBQXBCLEVBQThDO0FBQUEsTUFBYkMsTUFBYSx5REFBSixFQUFJOztBQUM1QyxNQUFNQyxTQUFTLEVBQWY7O0FBRUEsT0FBSyxJQUFJQyxJQUFULElBQWlCRixNQUFqQixFQUF5QjtBQUN2QixRQUFJRCxZQUFZSSxjQUFaLENBQTJCRCxJQUEzQixNQUFxQyxLQUF6QyxFQUNFLE1BQU0sSUFBSUUsS0FBSixzQ0FBNkNGLElBQTdDLE9BQU47QUFDSDs7QUFFRCxPQUFLLElBQUlBLEtBQVQsSUFBaUJILFdBQWpCLEVBQThCO0FBQzVCLFFBQUlFLE9BQU9FLGNBQVAsQ0FBc0JELEtBQXRCLE1BQWdDLElBQXBDLEVBQ0UsTUFBTSxJQUFJRSxLQUFKLGlCQUF3QkYsS0FBeEIsdUJBQU47O0FBRUYsUUFBTUcsYUFBYU4sWUFBWUcsS0FBWixDQUFuQjtBQUo0QixnQ0FReEIsNkJBQVlHLFdBQVdDLElBQXZCLENBUndCO0FBQUEsUUFNMUJDLGtCQU4wQix5QkFNMUJBLGtCQU4wQjtBQUFBLFFBTzFCQyxpQkFQMEIseUJBTzFCQSxpQkFQMEI7OztBQVU1QixRQUFJQyxjQUFKOztBQUVBLFFBQUlULE9BQU9HLGNBQVAsQ0FBc0JELEtBQXRCLE1BQWdDLElBQXBDLEVBQ0VPLFFBQVFULE9BQU9FLEtBQVAsQ0FBUixDQURGLEtBR0VPLFFBQVFKLFdBQVdLLE9BQW5COztBQUVGO0FBQ0FMLGVBQVdNLFNBQVgsR0FBdUJGLEtBQXZCOztBQUVBLFFBQUksQ0FBQ0QsaUJBQUQsSUFBc0IsQ0FBQ0Qsa0JBQTNCLEVBQ0UsTUFBTSxJQUFJSCxLQUFKLDBCQUFpQ0MsV0FBV0MsSUFBNUMsT0FBTjs7QUFFRkwsV0FBT0MsS0FBUCxJQUFlLG9CQUFVQSxLQUFWLEVBQWdCSyxrQkFBaEIsRUFBb0NDLGlCQUFwQyxFQUF1REgsVUFBdkQsRUFBbUVJLEtBQW5FLENBQWY7QUFDRDs7QUFFRCxTQUFPLDJCQUFpQlIsTUFBakIsRUFBeUJGLFdBQXpCLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BRCxXQUFXYyxVQUFYLEdBQXdCLFVBQVNDLFFBQVQsRUFBbUJDLG1CQUFuQixFQUF3QztBQUM5RCwrQkFBWUQsUUFBWixJQUF3QkMsbUJBQXhCO0FBQ0QsQ0FGRDs7a0JBSWVoQixVIiwiZmlsZSI6InBhcmFtZXRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyYW1ldGVyQmFnIGZyb20gJy4vUGFyYW1ldGVyQmFnJztcbmltcG9ydCBQYXJhbSBmcm9tICcuL1BhcmFtJztcbmltcG9ydCBkaWN0aW9ubmFyeSBmcm9tICcuL3BhcmFtZXRlclRlbXBsYXRlcyc7XG5cbi8qKlxuICogRmFjdG9yeSBmb3IgdGhlIGBQYXJhbWV0ZXJCYWdgIGNsYXNzXG4gKlxuICovXG5cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBib29sZWFuRGVmaW5pdGlvblxuICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdib29sZWFuJ10gLSBEZWZpbmUgYSBib29sZWFuIHBhcmFtZXRlci5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gcGFyYW1ldGVycyhkZWZpbml0aW9ucywgdmFsdWVzID0ge30pIHtcbiAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgZm9yIChsZXQgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICBpZiAoZGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IGZhbHNlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWZpbml0aW9uIG5vdCBmb3VuZCBmb3IgcGFyYW0gXCIke25hbWV9XCJgKTtcbiAgfVxuXG4gIGZvciAobGV0IG5hbWUgaW4gZGVmaW5pdGlvbnMpIHtcbiAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KG5hbWUpID09PSB0cnVlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCIke25hbWV9XCIgYWxyZWFkeSBkZWZpbmVkYCk7XG5cbiAgICBjb25zdCBkZWZpbml0aW9uID0gZGVmaW5pdGlvbnNbbmFtZV07XG4gICAgY29uc3Qge1xuICAgICAgZGVmaW5pdGlvblRlbXBsYXRlLFxuICAgICAgdHlwZUNoZWNrRnVuY3Rpb25cbiAgICB9ID0gZGljdGlvbm5hcnlbZGVmaW5pdGlvbi50eXBlXTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IHRydWUpXG4gICAgICB2YWx1ZSA9IHZhbHVlc1tuYW1lXTtcbiAgICBlbHNlXG4gICAgICB2YWx1ZSA9IGRlZmluaXRpb24uZGVmYXVsdDtcblxuICAgIC8vIHN0b3JlIGluaXQgdmFsdWUgaW4gZGVmaW5pdGlvblxuICAgIGRlZmluaXRpb24uaW5pdFZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoIXR5cGVDaGVja0Z1bmN0aW9uIHx8wqAhZGVmaW5pdGlvblRlbXBsYXRlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtIHR5cGUgXCIke2RlZmluaXRpb24udHlwZX1cImApO1xuXG4gICAgcGFyYW1zW25hbWVdID0gbmV3IFBhcmFtKG5hbWUsIGRlZmluaXRpb25UZW1wbGF0ZSwgdHlwZUNoZWNrRnVuY3Rpb24sIGRlZmluaXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUGFyYW1ldGVyQmFnKHBhcmFtcywgZGVmaW5pdGlvbnMpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IHR5cGUgZm9yIHRoZSBgcGFyYW1ldGVyc2AgZmFjdG9yeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlTmFtZSAtIFZhbHVlIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgYXMgdGhlIGB0eXBlYCBvZiBhXG4gKiAgcGFyYW0gZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7cGFyYW1ldGVyRGVmaW5pdGlvbn0gcGFyYW1ldGVyRGVmaW5pdGlvbiAtIE9iamVjdCBkZXNjcmliaW5nIHRoZVxuICogIHBhcmFtZXRlci5cbiAqL1xucGFyYW1ldGVycy5kZWZpbmVUeXBlID0gZnVuY3Rpb24odHlwZU5hbWUsIHBhcmFtZXRlckRlZmluaXRpb24pIHtcbiAgZGljdGlvbm5hcnlbdHlwZU5hbWVdID0gcGFyYW1ldGVyRGVmaW5pdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycztcbiJdfQ==