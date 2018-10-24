import { action, computed, autorun, observable } from 'mobx';
import validateable from 'mobx-vm/validateable';
import modelMember from 'mobx-vm/modelMember';
import ModularViewModel from 'mobx-vm/modularViewModel';
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
const myRequest = function (value) {
  return axios
    .get(
      'https://forms.gov.il/globalData/GetSequence/Gethtmlform.aspx?formType=componentsdemo@test.gov.il'
    )
    .then(res => {
      if (value === 'error') {
        throw new Error();
      }
      return true;
    })
    .catch(e => {
      return false;
    });
};

class PersonalInformation extends ModularViewModel {
  constructor() {
    const validations = [sumAges({ number: 60 })];
    super({ validations });

    // this.setPropertiesReferences();
    // this.propertiesManager.properties.fatherAge.dependedObservables = {
    //   age: this.propertiesManager.properties.age.ref
    // };
    // this.propertiesManager.properties.age.dependedObservables = {
    //   fatherAge: this.propertiesManager.properties.fatherAge.ref
    // };
    this.condition = function () {
      return true;
    };
  }
  @observable
  @modelMember()
  @validateable({
    validations: [
      maxlength({ value: 15 }),
      minlength({
        value: 2
        // message: () => ({ hebrew: 'my minlength message!!' })
      }),
      required(),
      hebrew({
        // message: () => ({ hebrew: 'my hebrew message!!' })
      })
    ]
  })
  firstName = 'כגד';
  @observable
  @modelMember({ reset: () => false })
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
  @modelMember()
  @validateable({
    validations: [
      // lessThan({
      //   value: 7,
      //   message: () => ({ hebrew: 'fasdghfasghf' })
      // })
    ]
  })
  age = 60;

  @computed
  get isAdult() {
    return this.age < 18;
  }

  //   @modelMember()
  //   @validateable({
  //     validations: [dependedGreaterThan({ number: 'age' })]
  //   })
  //   fatherAge = 0;
  @observable
  @modelMember()
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
  @modelMember()
  @validateable({
    validations: [] //conditionRequired({ condition: 'isAdult' })
  })
  fatherName = 0;

  @observable
  @modelMember()
  @validateable({
    validations: [
      generateAsyncValidation({
        name: 'tryAsyncValidation',
        message: () => ({ hebrew: 'my default error' }),
        request: myRequest
      })
    ]
  })
  comments = '';

  @modelMember()
  @validateable()
  gender = '2';

  @observable
  @modelMember()
  @validateable({ validations: [] })
  status = 'true';

  @observable
  @modelMember()
  @validateable({ validations: [] })
  agreement = '';

  @observable
  @modelMember()
  @validateable({ validations: [] })
  city = '';

  @observable
  @modelMember()
  @validateable({ validations: [] })
  birthDate = '';

  // #region actions
  @action.bound
  setFirstName(value) {
    this.firstName = value;
  }

  @action.bound
  setBirthDate(value) {
    this.birthDate = value;
  }
  @action.bound
  setCity(value) {
    this.city = value;
  }
  @action.bound
  setLastName(value) {
    this.lastName = value;
  }
  @action.bound
  setFatherAge(value) {
    this.fatherAge = value;
  }

  @action.bound
  setAge(value) {
    this.age = value;
  }
  @action.bound
  setFatherName(value) {
    this.fatherName = value;
  }
  @action.bound
  setComments(value) {
    this.comments = value;
  }
  @action.bound
  setGender(value) {
    this.gender = value;
  }
  @action.bound
  setStatus(value) {
    this.status = value;
  }
  @action.bound
  setAgreement(value) {
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
