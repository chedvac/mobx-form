import ModularViewModel from 'mobx-vm/modularViewModel';
import validateable from 'mobx-vm/validateable';
import modelMember1 from 'mobx-vm/modelMember';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';
const modelMember = modelMember1.default;
export class SubComplex extends ModularViewModel {
  @validateable()
  inSubComplex = false;
}

export default class ComplexTab extends ModularViewModel {
  constructor(settings) {
    super(settings);
    this.subModular = new SubComplex();
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
  subModular;
}
