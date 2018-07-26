import { action, computed } from 'mobx';
import formObservable from 'core/formObservable';
import modelProp from 'core/modelProp';

import ComplexType from 'core/ComplexType';
import { hebrew } from 'validations/rules/text';
import { maxlength, minlength, required } from 'validations/rules/basic';
import {
  dependedGreaterThan,
  greaterThan,
  lessThan
} from 'validations/rules/number';
import { sumAges } from './validations';
import { generateAsyncValidation } from 'validations/core/validationsFactory';
import axios from 'axios';

const myRequest = function(value) {
  return axios
    .get('http://gov.forms.local/MW/File//', { params: { ID: value } })
    .then(res => {
      if (res && res.data.statusCode === 0) {
        return true;
      }
      throw { error: 'async validaion failed' };
    });
};

class PersonalInformation extends ComplexType {
  // validations = [sumAges({ number: 60 })];

  constructor() {
    super();
    // this.ruleedObservables.fatherAge.setDependencies('age');
    // this.ruleedObservables.fatherAge.setDependencies({
    //   key: param
    // });
  }

  @modelProp()
  @formObservable({
    validations: [
      maxlength({
        value: 15
      }),
      minlength({ value: 2 }),
      required(),
      hebrew()
    ]
  })
  firstName = '';

  @modelProp()
  @formObservable({
    validations: [
      maxlength({
        value: 15,
        message: () => ({ hebrew: 'too long...' })
      })
    ]
  })
  lastName = '';

  @modelProp()
  @formObservable({
    validations: [
      lessThan({
        value: 7,
        message: () => ({ hebrew: 'fasdghfasghf' })
      })
    ]
  })
  age = 15;

  //   @modelProp()
  //   @formObservable({
  //     validations: [dependedGreaterThan({ number: 'age' })]
  //   })
  //   fatherAge = 0;
  @modelProp()
  @formObservable({
    validations: [dependedGreaterThan({ number: 'age' })]
  })
  // @formObservable({ change: PersonalInformation.prototype.ageLogger })
  fatherAge = 0;

  @modelProp()
  @formObservable({
    validations: [] //conditionRequired({ condition: 'isAdult' })
  })
  fatherName = 0;

  @modelProp()
  @formObservable({
    validations: [
      generateAsyncValidation({
        name: 'tryAsyncValidation',
        message: 'my default error',
        request: myRequest
      })
    ]
  })
  comments = '';
  @modelProp()
  @formObservable({ validations: [] })
  status = 'true';
  @modelProp()
  @formObservable({ validations: [] })
  agreement = '';
  @modelProp()
  @formObservable({ validations: [] })
  city = '';
  @modelProp()
  @formObservable({ validations: [] })
  birthDate = '';

  // #region actions
  @action.bound
  set_firstName(value) {
    this.firstName = value;
  }
  @action.bound
  set_birthDate(value) {
    this.birthDate = value;
  }
  @action.bound
  set_city(value) {
    this.city = value;
  }
  @action.bound
  set_lastName(value) {
    this.lastName = value;
  }
  @action.bound
  set_fatherAge(value) {
    this.fatherAge = value;
  }

  @action.bound
  set_age(value) {
    this.age = value;
  }
  @action.bound
  set_fatherName(value) {
    this.fatherName = value;
  }
  @action.bound
  set_comments(value) {
    this.comments = value;
  }
  @action.bound
  set_status(value) {
    this.status = value;
  }
  @action.bound
  set_agreement(value) {
    this.agreement = value;
  }
  //#endregion actions

  // #region computeds
  @computed
  fullName() {
    return this.firstName + this.lastName;
  }

  //#endregion computeds
}
export default PersonalInformation;
