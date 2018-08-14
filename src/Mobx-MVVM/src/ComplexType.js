import validationsManagerFactory from 'validations/core/validationsManager';
import ValidationState from 'core/ValidationState';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
import FormObservableBehavior from 'core/FormObservableBehavior';
import ModelPropBehavior from 'core/ModelPropBehavior';
import PropertiesManager from 'core/PropertiesManager';

export default class ComplexType {
  constructor(settings = {}) {
    this.formObservables = new PropertiesManager();
    this.modelProps = new PropertiesManager();

    this.validationsManager = new validationsManagerFactory( //todo: not use validationsManager, create validate function that run all validations and return {messages<list>, isvalid}
      settings.validations || []
    );
    this.validationState = new ValidationState(); //todo: should be {messages<list>, isvalid}

    fp.forOwn(value => {
      this.generateModelProp(value);
    })(this._modelPropsSettings);

    fp.forOwn(value => {
      this.generateFormObservable(value);
    })(this._formObservablesSettings);
  }

  generateModelProp(propertySettings) {
    const newModelProp = new ModelPropBehavior(propertySettings);
    this.modelProps.registerProperty(newModelProp);
  }
  generateFormObservable(propertySettings) {
    const newFormObservable = new FormObservableBehavior(propertySettings);
    this.formObservables.registerProperty(newFormObservable);
    Object.defineProperty(
      this,
      newFormObservable.name,
      newFormObservable.descriptor
    ); //todo:?
  }
  initializeComplexProperties() {
    const self = this;
    Object.values(this.modelProps.getProperties()).forEach(modelProperty => {
      const property = self[modelProperty.name];
      if (property instanceof ComplexType) {
        modelProperty.setRef(property);
      }
    });
  }
  getAction(name) {
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
    Object.values(this.modelProps.getProperties()).forEach(property => {
      propertiesState =
        propertiesState && this._validateByType(property.name, property);
    });
    return propertiesState;
  }
  _validateByType(name, property) {
    const instance = property.ref;
    return instance instanceof ComplexType
      ? instance.validate()
      : this.formObservables.getProperty(name).validate();
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
    Object.values(this.modelProps.getProperties()).forEach(property => {
      // //if(property.reset){
      // const instance = property.ref;
      // instance instanceof ComplexType
      //   ? instance.reset()
      //   : property.reset();
      // //}
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
* @function "setFormObservableSettings"
* @description this function call from formObservabless, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setFormObservableSettings({});
*/
ComplexType.prototype.setFormObservableSettings = assertParametersType(
  { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
  function setFormObservableSettings(settings) {
    //'this'- every class that extends ComplexType
    this._formObservablesSettings = this._formObservablesSettings || {};
    this._formObservablesSettings[settings.name] = settings;
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
