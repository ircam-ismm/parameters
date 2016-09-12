
/**
 * Bag of parameters. Main interface of the library
 */
class ParameterBag {
  constructor(params, definitions) {
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
    for (let name in params)
      this._paramsListeners[name] = new Set();
  }

  /**
   * Return the given definitions along with the initialization values.
   * @return {Object}
   */
  getDefinitions(name = null) {
    if (name !== null)
      return this._definitions[name];
    else
      return this._definitions;
  }

  /**
   * Return the value of the given parameter.
   * @param {String} name - Name of the parameter.
   */
  get(name) {
    return this._params[name].value;
  }

  /**
   * Set the value of a parameter. If the value of the parameter is updated
   * (aka if previous value is different from new value) all registered
   * callbacks are registered.
   * @param {String} name - Name of the parameter.
   * @param {Mixed} value - Value of the parameter.
   */
  set(name, value) {
    const param = this._params[name];
    const updated = param.setValue(value);
    value = param.getValue();

    if (updated) {
      const metas = param.definition.metas;
      // trigger global listeners
      for (let listener of this._globalListeners)
        listener(name, value, metas);

      // trigger param listeners
      for (let listener of this._paramsListeners[name])
        listener(value, metas);
    }

    return value;
  }

  /**
   * Reset a parameter to its init value. Reset all if name is `null`.
   * @param {String} [name=null] - Name of the parameter to reset.
   */
  reset(name = null) {
    if (name !== null)
      this.set(name, param.definition.initValue);
    else
      Object.keys(this._params).forEach((name) => this.reset(name));
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
  addListener(callback) {
    this._globalListeners.add(callback);
  }

  /**
   * Remove listener from all param changes.
   * @param {ParameterBag~listenerCallack} callback - Listener to remove. If
   *  `null` remove all listeners.
   */
  removeListener(callback = null) {
    if (callback === null)
      this._globalListeners.clear();
    else
      this._globalListeners.delete(callback);
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
  addParamListener(name, callback) {
    this._paramsListeners[name].add(callback);
  }

  /**
   * Remove listener from a given param updates.
   * @param {String} name - Parameter name.
   * @param {ParameterBag~paramListenerCallack} callback - Listener to remove.
   *  If `null` remove all listeners.
   */
  removeParamListener(name, callback = null) {
    if (callback === null)
      this._paramsListeners[name].clear();
    else
      this._paramsListeners[name].delete(callback);
  }
}

export default ParameterBag;
