import { action, computed } from 'mobx';
import formObservable from 'core/formObservable';
import modelProp from 'core/modelProp';

import ComplexType from 'core/ComplexType';
import { hebrew } from 'validations/rules/text';
import {
  maxlength,
  minlength,
  required
  //   conditionRequired
} from 'validations/rules/basic';
import {
  //   dependedGreaterThan,
  //   dependedLessThan,
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
    // this.setPropertiesReferences();
    // this.propertiesManager.properties.fatherAge.dependedObservables = {
    //   age: this.propertiesManager.properties.age.ref
    // };
    // this.propertiesManager.properties.age.dependedObservables = {
    //   fatherAge: this.propertiesManager.properties.fatherAge.ref
    // };
    this.condition = function() {
      return true;
    };
    this.set_firstName = this.set_firstName.bind(this);
    this.set_lastName = this.set_lastName.bind(this);
    this.set_fatherAge = this.set_fatherAge.bind(this);
    this.set_age = this.set_age.bind(this);
    this.set_comments = this.set_comments.bind(this);
    this.set_status = this.set_status.bind(this);
    this.set_agreement = this.set_agreement.bind(this);
    this.set_city = this.set_city.bind(this);
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

  @computed
  get isAdult() {
    return this.age < 18;
  }

  //   @modelProp()
  //   @formObservable({
  //     validations: [dependedGreaterThan({ number: 'age' })]
  //   })
  //   fatherAge = 0;

  @modelProp()
  @formObservable({
    validations: [
      greaterThan({
        value: 20
        // compareToName: 'compareToName',
        // message: { hebrew: 'my message' }
      })
    ]
  })
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
  @action
  set_firstName(value) {
    this.firstName = value;
  }
  @action
  set_birthDate(value) {
    this.birthDate = value;
  }
  @action
  set_city(value) {
    this.city = value;
  }
  @action
  set_lastName(value) {
    this.lastName = value;
  }
  @action
  set_fatherAge(value) {
    this.fatherAge = value;
  }

  @action
  set_age(value) {
    this.age = value;
  }
  @action
  set_fatherName(value) {
    this.fatherName = value;
  }
  @action
  set_comments(value) {
    this.comments = value;
  }
  @action
  set_status(value) {
    this.status = value;
  }
  @action
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
