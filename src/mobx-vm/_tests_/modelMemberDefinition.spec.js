import ModelMemberDefinition from 'mobx-vm/modelMemberDefinition';

let modelMember;
let settings = {
  name: 'firstName',
  defaultValue: 'Dan',
  map: {},
  resetIgnor: false
};
beforeAll(() => {
  modelMember = new ModelMemberDefinition(settings);
});
describe('define setting to model member', () => {
  test('define name to model member', () => {
    expect(modelMember.name).toEqual(settings.name);
  });
  test('define defaultValue to model member', () => {
    expect(modelMember.defaultValue).toEqual(settings.defaultValue);
  });
  test('define map to model member', () => {
    expect(modelMember.map).toEqual(settings.map);
  });
  test('define resetIgnor to model member', () => {
    expect(modelMember.resetIgnor).toEqual(settings.resetIgnor);
  });
  test('define empty object to map if not exist at settings', () => {
    settings = {
      name: 'firstName',
      defaultValue: 'Dan'
    };
    modelMember = new ModelMemberDefinition(settings);
    expect(modelMember.map).toBeDefined();
  });
});
