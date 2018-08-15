import validationsManagerFactory from 'validations/core/validationsManager';
import ValidationState from 'core/validationState';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
import ValidateableObservableBehavior from 'core/validateableObservableBehavior';
import ModelPropBehavior from 'core/modelPropBehavior';

export default class ComplexType {
  constructor(settings = {}) {
    this.validateableObservablesProperties = {};
    this.modelPropsProperties = {};

    this.validationsManager = new validationsManagerFactory( //todo: not use validationsManager, create validate function that run all validations and return {messages<list>, isvalid}
      settings.validations || []
    );
    this.validationState = new ValidationState(); //todo: should be {messages<list>, isvalid}

    fp.forOwn(value => {
      this.generateModelProp(value);
    })(this._modelPropsSettings);

    fp.forOwn(value => {
      this.generateValidateableObservable(value);
    })(this._validateableObservablesSettings);
  }

  generateModelProp(propertySettings) {
    const newModelProp = new ModelPropBehavior(propertySettings);
    this.modelPropsProperties[newModelProp.name] = newModelProp;
  }
  generateValidateableObservable(propertySettings) {
    const newValidateableObservable = new ValidateableObservableBehavior(propertySettings);
    this.validateableObservablesProperties[newValidateableObservable.name] = newValidateableObservable;
    this._overrideTempDescriptor(newValidateableObservable);
  }

  _overrideTempDescriptor(property) {
    const descriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(this),
      property.name
    );
    delete descriptor.initializer;
    delete descriptor.value;
    delete descriptor.writable;

    descriptor.set = function(newValue) {
      property.observable.set(newValue);
    };

    descriptor.get = function() {
      return property.observable.get();
    };
    Object.defineProperty(this, property.name, descriptor);
  }
  
  
  getAction(name) {
    //todo: check
    return newValue => {
      this[`set_${name}`](newValue);
    };
  }
  /**     
* @memberof ComplexType         
* @function "validate"
* @description validate complexType and its properties
* @return {bool} manipulation result
* @example 
  PersonalInfo.validate();
*/
  validate() {
    const validationResult = this.validationsManager.validate(this);
    this.validationState.setValidationState(validationResult);
    const propertiesValidationResult = this.validateModel();
    this.validationState.setIsValid(
      propertiesValidationResult && validationResult.isValid
    );
    return this.validationState.isValid;
  }
  /**     
  * @memberof ComplexType         
  * @function "validateModel"
  * @description validate all model properties
  * @return {bool} properties validation state result
  * @example 
    PersonalInfo.validateModel();
  */
  validateModel() {
    let propertiesState = true;
    Object.values(this.modelPropsProperties).forEach(property => {
      propertiesState =
        propertiesState && this._validateByType(property.name);
    });
    return propertiesState;
  }
  _validateByType(name) {
    const instance =  this[name];
    return instance instanceof ComplexType
      ? instance.validate()
      : this.validateableObservablesProperties[name].validate();
  }
  /**     
  * @memberof ComplexType         
  * @function "reset"
  * @description validate all model properties
  * @return {bool} properties validation state result
  * @example 
    PersonalInfo.reset();
  */
  reset() {
    Object.values(this.modelPropsProperties).forEach(property => {
      if (property.reset) {
        property.reset();
      }
    });
  }

  /**     
    * @memberof ModelPropsManager        
    * @function "map"
    * @description map all properties array
    * @param {object} params
    * @example 
        modelPropsManager1.map(tab);
    */
  @assertParametersType({ params: PropTypes.object })
  map(params) {
    Object.values(this.getProperties()).forEach(property => {
      property.map(params);
    });
  }
}
/**     
* @memberof ComplexType         
* @function "setValidateableObservableSettings"
* @description this function call from validateableObservabless, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setValidateableObservableSettings({});
*/
ComplexType.prototype.setValidateableObservableSettings = assertParametersType(
  { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
  function setValidateableObservableSettings(settings) {
    //'this'- every class that extends ComplexType
    this._validateableObservablesSettings = this._validateableObservablesSettings || {};
    this._validateableObservablesSettings[settings.name] = settings;
  }
);
/**     
* @memberof ComplexType         
* @function "setModelPropSettings"
* @description this function call from modelProp decorators, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setModelPropSettings({});
*/
ComplexType.prototype.setModelPropSettings = assertParametersType(
  { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
  function setModelPropSettings(settings) {
    //'this'- every class that extends ComplexType
    this._modelPropsSettings = this._modelPropsSettings || {};
    this._modelPropsSettings[settings.name] = settings;
  }
);
