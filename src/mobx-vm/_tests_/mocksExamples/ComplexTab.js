import ComplexType from 'mobx-vm/complexType';
import validateable from 'mobx-vm/validateable';
import modelProp1 from 'mobx-vm/modelProp';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';
// console.log(modelMember1.default);
const modelMember = modelMember1.default;
export class Complex extends ComplexType {
  constructor(settings) {
    super(settings);
  }
  @validateable()
  inSubComplex = false;
}

export default class ComplexTab extends ComplexType {
  constructor(settings, register) {
    super(settings);
    this.subComplex = new Complex();
  }
  @modelMember()
  @validateable({
    validations: [hebrew(), maxlength({ value: 5 })]
  })
  agreement = '';
  @modelMember()
  @validateable({
    validations: [hebrew(), maxlength({ value: 5 })]
  })
  firstName = 'יעל';
  @modelMember()
  subComplex;
}
