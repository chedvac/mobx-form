import PropertyBehavior from './PropertyBehavior';
/**
 * @class PropertiesManager
 * @classdesc PropertiesManager - manage all properties of complex
 */
export default class PropertiesManager {
  constructor() {
    this.setFormObservableProperty = this.setFormObservableProperty.bind(this);
    this.getValidationManagerProperty = this.getValidationManagerProperty.bind(
      this
    );
    this.getPropertyDependencies = this.getPropertyDependencies.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    this.mapProperty = this.mapProperty.bind(this);
    this.resetProperty = this.resetProperty.bind(this);
    this.createProperty = this.createProperty.bind(this);
    this.setModelProp = this.setModelProp.bind(this);
    this.applyChildAction = this.applyChildAction.bind(this);
    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
    this.createProperty = this.createProperty.bind(this);
    this.setComplexProperty = this.setComplexProperty.bind(this);
  }
  properties = {};
  getPropertyValidationState = function(name) {
    return this.properties[name].validationState;
  };
  /**     
    * @memberof PropertiesManager         
    * @function "getPropertyDependencies"
    * @description return dependedObservables object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        propertiesManager1.getPropertyDependencies('lastName');
    */
  getPropertyDependencies = function(name) {
    return this.properties[name].dependedObservables;
  };
  /**     
    * @memberof PropertiesManager         
    * @function "getValidationManagerProperty"
    * @description return validationsManager object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        propertiesManager1.getValidationManagerProperty('lastName');
    */
  getValidationManagerProperty = function(name) {
    return this.properties[name].validationsManager;
  };
  /**     
    * @memberof PropertiesManager         
    * @function "validateProperty"
    * @description call validate function of speciphic property by name 
    * @param {string}  propertyName
    * @param {any} newVal
    * @example 
        propertiesManager1.validateProperty('lastName', 'family');
    */
  validateProperty = function(name, newVal) {
    const validate = this.properties[name].validate;
    if (typeof validate === 'function') {
      return validate(newVal);
    }
    return true;
  };
  /**     
    * @memberof PropertiesManager         
    * @function "mapProperty"
    * @description call map function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        propertiesManager1.mapProperty('lastName', 'family');
    */
  mapProperty = function(name, ...params) {
    return this.properties[name].map(params);
  };
  /**     
    * @memberof PropertiesManager         
    * @function "resetProperty"
    * @description call reset function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        propertiesManager1.resetProperty('lastName', {});
    */
  resetProperty = function(name, ...params) {
    return this.properties[name].reset(params);
  };
  /**     
   * @memberof PropertiesManager         
   * @function "createProperty"
   * @description define new property at PropertiesManager. add it to PropertiesManager.properties array 
   * and put reference to it at PropertiesManager itself to easier use
   * @param {string}  propertyName
   * @example 
   propertiesManager1.createProperty('lastName');
   */
  createProperty = function(propertyName) {
    this.properties[propertyName] = new PropertyBehavior();
    this[propertyName] = this.properties[propertyName];
  };
  /**     
    * @memberof PropertiesManager         
    * @function "setComplexProperty"
    * @description add behavior of complex property to exist property. extract validate from settings, asd call property.setValidate with it
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
    propertiesManager1.createProperty('lastName', {validate});
    */
  setComplexProperty = function(propertyName, settings = {}) {
    if (!(this[propertyName] instanceof PropertyBehavior)) {
      throw 'setComplexProperty should call after PropertiesManager.createProperty is call';
    }
    const { validate } = settings;
    this[propertyName].setValidate(validate);
  };
  /**     
    * @memberof PropertiesManager         
    * @function "setFormObservableProperty"
    * @description add behavior of formObservable to exist property. extract validate, ref and validationsManager from settings, and call PropertyBehavior set functions
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
     propertiesManager1.setFormObservableProperty('lastName', {validate, ref, validationsManager});
    */
  setFormObservableProperty = function(propertyName, settings = {}) {
    if (!this[propertyName] instanceof PropertyBehavior) {
      throw 'setFormObservableProperty should call after PropertiesManager.createProperty is call';
    }
    const { validate, ref, validationsManager } = settings;
    this[propertyName].setRef(ref);
    this[propertyName].setValidationsManager(validationsManager);
    this[propertyName].setValidate(validate);
  };
  /**     
   * @memberof PropertiesManager         
   * @function "setModelProp"
   * @description add behavior of modelProp to exist property. extract reset and map  from settings, and call PropertyBehavior set functions
   * @param {string}  propertyName
   * @param {object}  settings
   * @example 
       propertiesManager1.setModelProp('lastName', {map, reset});
   */
  setModelProp = function(propertyName, settings = {}) {
    const { reset, map } = settings;
    this[propertyName].setReset(reset);
    this[propertyName].setMap(map);
  };
  /**     
    * @memberof PropertiesManager         
    * @function "applyChildAction"
    * @description loop over all properties array, exac the requested action with settings parameter
    * @param {string}  actionName
    * @param {object}  params
    * @example 
        propertiesManager1.applyChildAction('reset', {});
    */
  //TODO check is neccessary
  applyChildAction(actionName, params = {}) {
    try {
      for (let property in this.properties) {
        typeof this.properties[property][actionName] === 'function'
          ? this.properties[property][actionName](params)
          : false;
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  /**     
    * @memberof PropertiesManager         
    * @function "validate"
    * @description validate all properties array
    * @param {object}  parent
    * @example 
        propertiesManager1.validate(tab);
    */
  validate() {
    let isValid = true;
    for (let property in this.properties) {
      const isPropertyValid = this.validateProperty(property);
      isValid = isPropertyValid ? isValid : false;
    }
    return isValid;
  }
  /**     
    * @memberof PropertiesManager         
    * @function "reset"
    * @description reset all properties array
    * @param {object} params
    * @example 
        propertiesManager1.reset(tab);
    */
  reset(params) {
    for (const property in this.propertiesManager) {
      this.resetProperty(property, params);
    }
  }
}
