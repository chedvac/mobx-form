import validationsManagerFactory from 'vmValidations/validationsManager';
import validationState from 'vmValidations/validationState';
import PropTypes from 'prop-types';
import { reaction, autorun } from 'mobx';
import assertParametersType from 'utils/typeVerifications';
import fp from 'lodash/fp';
import ValidateableBehavior from 'core/validateableBehavior';
import ModelMemberBehavior from 'core/modelMemberBehavior';
import { observable, runInAction } from 'mobx';

export default class ComplexType {
  constructor(settings = {}) {
    this.validateablesSettings = {};
    this.modelMembersSettings = {};
    // this.validations = settings.validations||[];
    this.validationsManager = new validationsManagerFactory( //todo: not use validationsManager, create validate function that run all validations and return {messages<list>, isvalid}
      settings.validations || []
    );
    this.validationState = observable(validationState); //todo: should be {messages<list>, isvalid}

    fp.forOwn(value => {
      this.generateModelMember(value);
    })(this._modelMembersSettings);

    fp.forOwn(value => {
      this.generateValidateable(value);
    })(this._validateablesSettings);
  }

  generateModelMember(propertySettings) {
    const modelMember = new ModelMemberBehavior(propertySettings);
    this.modelMembersSettings[modelMember.name] = modelMember;
  }
  generateValidateable(propertySettings) {
    const validateable = new ValidateableBehavior(propertySettings);
    this.validateablesSettings[validateable.name] = validateable;
    reaction(
      () => this[validateable.name],
      value => validateable.validate(value)
    );
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

    runInAction(() => {
      Object.assign(this.validationState, validationResult);
    });
    const propertiesValidationResult = this.validateModel();
    runInAction(() => {
      Object.assign(this.validationState, {
        isValid: propertiesValidationResult && validationResult.isValid
      });
    });
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
    Object.values(this.modelMembersSettings).forEach(property => {
      propertiesState = propertiesState && this._validateByType(property.name);
    });
    return propertiesState;
  }
  _validateByType(name) {
    const instance = this[name];
    return instance instanceof ComplexType
      ? instance.validate()
      : this.validateablesSettings[name].validate(this[name]);
  }
  /**     
    * @memberof ComplexType         
    * @function "addValidations"
    * @description add Validations to existing property
    * @param {string} propertyName propertyName
    * @param {array} validations validations to add
    * @return {void} 
    * @example 
      PersonalInfo.addValidations('firstName',[ maxlength({ value: 15 })]);
    */
  addValidations(propertyName, validations) {
    this.validateablesSettings[propertyName].validationsManager.addValidations(
      validations
    );
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
    Object.values(this.modelMembersSettings).forEach(property => {
      if (property.reset) {
        property.reset();
      }
    });
  }

  /**     
    * @memberof ModelMembersManager        
    * @function "map"
    * @description map all properties array
    * @param {object} params
    * @example 
        modelMembersManager1.map(tab);
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
* @function "setModelMemberSettings"
* @description this function call from modelMember decorators, in classes that extends ComplexType. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setModelMemberSettings({});
*/
ComplexType.prototype.setModelMemberSettings = assertParametersType(
  { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
  function setModelMemberSettings(settings) {
    //'this'- every class that extends ComplexType
    this._modelMembersSettings = this._modelMembersSettings || {};
    this._modelMembersSettings[settings.name] = settings;
  }
);
