import validationsManagerFactory from 'vm-validations/validationsManager';
import { validationStateMultiMessages } from 'vm-validations/validationState';
import PropTypes from 'prop-types';
import { observable, reaction, action } from 'mobx';
import assertParametersType from 'utils/typeVerifications';
import { forOwn, upperFirst } from 'lodash/fp';

import ValidateableDefinition from 'mobx-vm/validateableDefinition';
import ModelMemberDefinition from 'mobx-vm/modelMemberDefinition';

export default class ModularViewModel {
    constructor(settings = {}) {
        this.validateables = {};
        this.modaelMembers = {};

        this.validationsManager = new validationsManagerFactory(
            settings.validations || []
        );
        this.validationState = observable(validationStateMultiMessages);

        forOwn(value => {
            this.generateModelMember(value);
        })(this._modelMembersSettings);

        forOwn(value => {
            this.generateValidateable(value);
        })(this._validateablesSettings);
        this.validate = this.validate.bind(this);
    }

    generateModelMember(propertySettings) {
        const modelMember = new ModelMemberDefinition(propertySettings);
        this.modelMembers[modelMember.name] = modelMember;
    }
    generateValidateable(propertySettings) {
        const validateable = new ValidateableDefinition(propertySettings);
        this.validateables[validateable.name] = validateable;
        reaction(
            () => this[validateable.name],
            value => validateable.validate(value)
        );
    }

    /**     
  * @memberof ModularViewModel         
  * @function "getAction"
  * @description return action of property
  * @return {function} action
  * @example 
    PersonalInfo.getAction();
  */
    getAction(name) {
        return this[`set${upperFirst(name)}`];
    }
    @action
    setValidationState(validationState) {
        Object.assign(this.validationState, validationState);
    }
    /**     
  * @memberof ModularViewModel         
  * @function "validate"
  * @description validate modularViewModel and its properties
  * @return {bool} manipulation result
  * @example 
    PersonalInfo.validate();
  */
    async validate() {
        const validationResult = await this.validationsManager.validateMultiResults(
            this
        );
        const modelValidationResult = await this.validateModel();
        this.setValidationState({
            messages: validationResult.messages,
            isValid: modelValidationResult && validationResult.isValid
        });
        return this.validationState.isValid;
    }

    /**     
    * @memberof ModularViewModel         
    * @function "validateModel"
    * @description validate all model properties
    * @return {bool} properties validation state result
    * @example 
      PersonalInfo.validateModel();
    */
    async validateModel() {
        let modelValid = true;
        for (const property in this.modelMembers) {
            if (this.modelMembers.hasOwnProperty(property)) {
                const currentPropertyValid = await this._validateByType(property);
                modelValid = modelValid && currentPropertyValid;
            }
        }
        return modelValid;
    }
    async _validateByType(name) {
        const instance = this[name];
        return (await instance) instanceof ModularViewModel
            ? instance.validate()
            : this.validateables[name].validate(this[name]);
    }
    /**     
      * @memberof ModularViewModel         
      * @function "addValidations"
      * @description add Validations to existing property
      * @param {string} propertyName propertyName
      * @param {array} validations validations to add
      * @return {void} 
      * @example 
        PersonalInfo.addValidations('firstName',[ maxlength({ value: 15 })]);
      */
    addValidations(propertyName, validations) {
        this.validateables[propertyName].validationsManager.addValidations(
            validations
        );
    }
    /**     
    * @memberof ModularViewModel         
    * @function "reset"
    * @description validate all model properties
    * @return {bool} properties validation state result
    * @example 
      PersonalInfo.reset();
    */
    reset() {
        Object.values(this.modelMembers).forEach(property => {
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
* @memberof ModularViewModel         
* @function "setValidateableSettings"
* @description this function call from validateabless, in classes that extends ModularViewModel. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setValidateableSettings({});
*/
ModularViewModel.prototype.setValidateableSettings = assertParametersType(
    { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
    function setValidateableSettings(settings) {
        //'this'- every class that extends ModularViewModel
        this._validateablesSettings = this._validateablesSettings || {};
        this._validateablesSettings[settings.name] = settings;
    }
);
/**     
* @memberof ModularViewModel         
* @function "setModelMemberSettings"
* @description this function call from modelMember decorators, in classes that extends ModularViewModel. call in defenition,  not in instance
* @param {object}  settings
* @example 
  PersonalInfo.setModelMemberSettings({});
*/
ModularViewModel.prototype.setModelMemberSettings = assertParametersType(
    { settings: PropTypes.shape({ name: PropTypes.string.isRequired }) },
    function setModelMemberSettings(settings) {
        //'this'- every class that extends ModularViewModel
        this._modelMembersSettings = this._modelMembersSettings || {};
        this._modelMembersSettings[settings.name] = settings;
    }
);
