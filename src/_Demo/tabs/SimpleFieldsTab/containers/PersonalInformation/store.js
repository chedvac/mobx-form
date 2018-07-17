import { observable, autorun, action, computed } from "mobx";
import formObservable from "../../../../../core/formObservable";
import modelProp from "../../../../../core/modelProp";

import ComplexType from "../../../../../core/ComplexType";
import addressValidations from "../../../../../validations/address";
import { hebrewName } from "../../../../../validations/text";
import { maxlength } from "../../../../../validations/basic";
import { greaterThan, lessThan } from "../../../../../validations/number";
import { sumAges } from "./validations";
import validationFactory from "./../../../../../validations/validationsFactory";
import axios from "axios";

const myRequest = function(value) {
  return axios
    .get(
      "http://formsdev.vcloud.gov.il/govservicelist/ListManager/GetTable?tableName=AreaCodes&type=json",
      { params: { ID: value } }
    )
    .then(res => {
      if (res && value !== "failed") {
        return true;
      } else {
        return false;
      }
      throw { error: "async validaion failed" };
    });
};

class PersonalInformation extends ComplexType {
  validations = [sumAges({ number: 60 })];

  constructor() {
    super();

    this.propertiesManager.properties.fatherAge.validationsManager.validations.push(
      greaterThan({ number1: this.propertiesManager.properties.age.ref })
    );
    this.propertiesManager.properties.age.validationsManager.validations.push(
      lessThan({ number1: this.propertiesManager.properties.fatherAge.ref })
    );

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
      hebrewName({ message: "hebrew only" }),
      maxlength({ value: 15, message: "too long..." })
    ]
  })
  firstName = "";
  @modelProp()
  @formObservable({
    validations: [
      hebrewName({ message: "hebrew only" }),
      maxlength({ value: 15, message: "too long..." })
    ]
  })
  lastName = "";
  @modelProp()
  @formObservable({ validations: [] })
  age = 15;
  @modelProp()
  @formObservable({ validations: [greaterThan({ number: 10 })] })
  fatherAge = 0;
  @modelProp()
  @formObservable({
    validations: [
      validationFactory.generateAsyncValidation({
        name: "tryAsyncValidation",
        message: () => "my default error",
        request: myRequest
      })
    ]
  })
  comments = "";
  @modelProp()
  @formObservable({ validations: [] })
  status = "true";
  @modelProp()
  @formObservable({ validations: [] })
  agreement = "";
  @modelProp()
  @formObservable({ validations: [] })
  city = "";

  // #region actions
  @action
  set_firstName(value) {
    this.firstName = value;
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
  // @computed
  // fullName() {
  //   return this.firstName + this.lastName;
  // }

  //#endregion computeds
}
export default PersonalInformation;
