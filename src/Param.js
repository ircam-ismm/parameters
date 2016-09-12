
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
class Param {
  constructor(name, definitionTemplate, typeCheckFunction, definition, value) {
    definitionTemplate.forEach(function(key) {
      if (definition.hasOwnProperty(key) === false)
        throw new Error(`Invalid definition for param "${name}", ${key} is not defined`);
    });

    this.name = name;
    this.type = definition.type;
    this.definition = definition;
    this.value = typeCheckFunction(value, definition, name);
    this._typeCheckFunction = typeCheckFunction;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    if (this.definition.constant === true)
      throw new Error(`Invalid assignement to constant param "${this.name}"`);

    value = this._typeCheckFunction(value, this.definition, this.name);

    if (this.value !== value) {
      this.value = value;
      return true;
    }

    return false;
  }
}

export default Param;
