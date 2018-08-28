import { action, computed, autorun, observable } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelProp from 'mobx-vm/modelProp';
import ComplexType from 'mobx-vm/complexType';
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
import { generateAsyncValidation } from 'vm-validations/validationsFactory';
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
  }
  @observable
  @modelProp({ reset: () => console.log('not reset FirstName') })
  @validateable({
    validations: [
      maxlength({ value: 15 }),
      minlength({
        value: 2,
        message: () => ({ hebrew: 'my minlength message!!' })
      }),
      required(),
      hebrew({ message: () => ({ hebrew: 'my hebrew message!!' }) })
    ]
  })
  firstName = '';
  @observable
  @modelProp({ reset: () => false })
  @validateable({
    validations: [
      maxlength({
        value: 15,
        message: () => ({ hebrew: 'too long...' })
      }),
      minlength({ value: 2 }),
      hebrew()
    ]
  })
  lastName = '';

  @observable
  @modelProp()
  @validateable({
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
  //   @validateable({
  //     validations: [dependedGreaterThan({ number: 'age' })]
  //   })
  //   fatherAge = 0;
  @observable
  @modelProp()
  @validateable({
    validations: [
      maxlength({ value: 15 }),
      minlength({ value: 2 }),
      greaterThan({
        value: 20
        // compareToName: 'compareToName',
        // message: { hebrew: 'my message' }
      })
    ]
  })
  fatherAge = 0;

  @observable
  @modelProp()
  @validateable({
    validations: [] //conditionRequired({ condition: 'isAdult' })
  })
  fatherName = 0;

  @observable
  @modelProp()
  @validateable({
    validations: [
      generateAsyncValidation({
        name: 'tryAsyncValidation',
        message: () => 'my default error',
        request: myRequest
      })
    ]
  })
  comments = '';

  @observable
  @modelProp()
  @validateable({ validations: [] })
  status = 'true';

  @observable
  @modelProp()
  @validateable({ validations: [] })
  agreement = '';

  @observable
  @modelProp()
  @validateable({ validations: [] })
  city = '';

  @observable
  @modelProp()
  @validateable({ validations: [] })
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
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  //#endregion computeds
}
export default PersonalInformation;
