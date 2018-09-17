import ModelMemberDefinition from 'mobx-vm/modelMemberDefinition';

let modelMember;
beforeAll(() => {
  modelMember = new ModelMemberDefinition();
});
describe('ModelMemberDefinition', () => {
  describe('define properties:', () => {
    test('setReset', () => {
      expect(modelMember.setReset).toBeDefined();
    });

    test('setMap', () => {
      expect(modelMember.setMap).toBeDefined();
    });
  });
  describe('logic:', () => {
    test('setReset', () => {
      const reset = () => {};
      modelMember.setReset(reset);
      expect(modelMember.reset).toBe(reset);
    });
    test('setMap', () => {
      const map = () => {};
      modelMember.setMap(map);
      expect(modelMember.map).toBe(map);
    });
  });
});
