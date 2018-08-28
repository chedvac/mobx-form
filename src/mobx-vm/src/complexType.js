import validationsManagerFactory from 'vm-validations/validationsManager';
import ValidationState from 'mobx-vm/validationState';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
import ValidateableBehavior from 'mobx-vm/validateableBehavior';
import ModelPropBehavior from 'mobx-vm/modelPropBehavior';

export default class ComplexType {
  constructor(settings = {}) {
    this.validateablesProperties = {};
    this.modelPropsProperties = {};

    this.validationsManager = new validationsManagerFactory( //todo: not use validationsManager, create validate function that run all validations and return {messages<list>, isvalid}
      settings.validations || []
    );
    this.validationState = new ValidationState(); //todo: should be {messages<list>, isvalid}

    fp.forOwn(value => {
      this.generateModelProp(value);
    })(this._modelPropsSettings);

    fp.forOwn(value => {
      this.generateValidateable(value);
    })(this._validateablesSettings);
  }

  generateModelProp(propertySettings) {
    const newModelProp = new ModelPropBehavior(propertySettings);
    this.modelPropsProperties[newModelProp.name] = newModelProp;
  }
  generateValidateable(propertySettings) {
    const newValidateable = new ValidateableBehavior(propertySettings);
    this.validateablesProperties[newValidateable.name] = newValidateable;
    this.createObservableValidation(newValidateable);
  }
  createObservableValidation(newValidateable) {
    reaction(
      () => newValidateable,
      newValidateable => newValidateable.validate(this[newValidateable.name])
    );
    //autorun(() => newValidateable.validate(this[newValidateable.name]));
  }

  /**     
* @memberof ComplexType         
* @function "getAction"
* @description return action of property
* @return {function} action
* @example 
  PersonalInfo.getAction();
*/
  getAction(name) {
    return this[`set_${name}`];
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
      propertiesState = propertiesState && this._validateByType(property.name);
    });
    return propertiesState;
  }
  _validateByType(name) {
    const instance = this[name];
    return instance instanceof ComplexType
      ? instance.validate()
      : this.validateablesProperties[name].validate(this[name]);
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
* @function "setValidateableSettings"
* @description this function call from validateabless, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setValidateableSettings({});
*/
ComplexType.prototype.setValidateableSettings = assertParametersType(
  { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
  function setValidateableSettings(settings) {
    //'this'- every class that extends ComplexType
    this._validateablesSettings = this._validateablesSettings || {};
    this._validateablesSettings[settings.name] = settings;
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
