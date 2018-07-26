import validationsManagerFactory from 'validations/core/validationsManager';
import FormObservablesManager from './propertiesManager/FormObservablesManager';
import ModelPropsManager from './propertiesManager/ModelPropsManager';
import ValidationState from 'core/ValidationState';
import formObservableGenerator from './formObservableGenerator';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
export default class ComplexType {
  constructor(settings = {}) {
    this.formObservablesManager = new FormObservablesManager();
    this.modelPropsManager = new ModelPropsManager();

    this.validationsManager = new validationsManagerFactory(//todo: not use validationsManager, create validate function that run all validations and return {messages<list>, isvalid}
      settings.validations || []
    );
    this.validationState = new ValidationState();//todo: should be {messages<list>, isvalid}

    fp.forOwn(value => {
      this.generateModelProp(value);
      this.generateFormObservable(value);
    })(this._propertiesSettings);
    this.setPropertiesReferences();
  }
  getAction(name){
     return newValue => {this[`set_${name}`](newValue);};
  }
 
  generateModelProp(property) {
    if (!property.isModelProp) {
      return;
    }
    this.modelPropsManager.createProperty(property);
  }
  generateFormObservable(property) {
    if (!property.isFormObservable) {
      return;
    }
    this.formObservablesManager.createProperty(property);
    formObservableGenerator({//todo: move
      name: property.name,
      descriptor: property.descriptor,
      defaultValue: property.defaultValue,
      validations: property.validations,
      formObservablesManager: this.formObservablesManager
    });
   
  }
  setPropertiesReferences() {//todo:move to formObservablrGenerator
    const self = this;
    Object.keys(self.formObservablesManager.getProperties()).forEach(
      propertyName => {
        const property = self.formObservablesManager.getProperty(propertyName);
        Object.defineProperty(self, propertyName, property.descriptor);
      }
    );
  }

  initializeComplexProperties() {
    const self = this;
    Object.keys(this._propertiesSettings).forEach(key => {
      const property = self[key];
      if (property instanceof ComplexType) {
        self.modelPropsManager.setComplexProperty(key, {
          ref: property

        });
      }
    });
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
    Object.entries(this.modelPropsManager.getProperties()).forEach(
      ([name, property]) => {
        propertiesState =
          propertiesState && this._validateByType(name, property);
      }
    );
    return propertiesState;
  }
  _validateByType(name, property) {
    const instance = property.ref;
    return instance instanceof ComplexType
      ? instance.validate()
      : this.formObservablesManager.getProperty(name).validate();
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
    Object.values(this.modelPropsManager.getProperties()).forEach(property => {
      // //if(property.reset){
      // const instance = property.ref;
      // instance instanceof ComplexType
      //   ? instance.reset()
      //   : property.reset();
      // //}
      if(property.reset){
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
* @function "setPropertySettings"
* @description this function call from formObservables and modelProp decorators, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setPropertySettings({});
*/
ComplexType.prototype.setPropertySettings = function(settings) {
  const propTypes = {
    settings: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  };
  assertParametersType({ settings }, propTypes, 'setPropertySettings');
  //'this'- every class that extends ComplexType
  this._propertiesSettings = this._propertiesSettings || {};
  const currntSettings = this._propertiesSettings[settings.name] || {};
  this._propertiesSettings[settings.name] = Object.assign(
    currntSettings,
    settings
  );
};
