import ComplexType from 'mobx-vm/complexType';
import validateable from 'mobx-vm/validateable';
import modelProp1 from 'mobx-vm/modelProp';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';
// console.log(modelProp1.default);
const modelProp = modelProp1.default;
export class Complex extends ComplexType {
  constructor(settings) {
    super(settings);
  }
  @validateable() inSubComplex = false;
}

export default class ComplexTab extends ComplexType {
  constructor(settings, register) {
    super(settings);
    this.subComplex = new Complex();
  }
  @modelProp()
  @validateable({
    validations: [
      hebrew(),
      maxlength({ value: 5})
    ]
  })
  agreement = '';
  @modelProp()
  @validateable({
    validations: [
      hebrew(),
      maxlength({ value: 5})
    ]
  })
  firstName = 'יעל';
  @modelProp() subComplex;
}
