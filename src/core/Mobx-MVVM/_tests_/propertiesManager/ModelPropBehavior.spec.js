import ModelPropBehavior from 'core/propertiesManager/ModelPropBehavior';

let modelProp;
beforeAll(() => {
  modelProp = new ModelPropBehavior();
});
describe('ModelPropBehavior', () => {
  describe('define properties:', () => {
    test('setReset', () => {
      expect(modelProp.setReset).toBeDefined();
    });
   
    test('setMap', () => {
      expect(modelProp.setMap).toBeDefined();
    });
    test('setRef', () => {
      expect(modelProp.setRef).toBeDefined();
    });
   
  });
  describe('logic:', () => {
  
    test('setReset', () => {
      const reset = () => {};
      modelProp.setReset(reset);
      expect(modelProp.reset).toBe(reset);
    });
    test('setMap', () => {
      const map = () => {};
      modelProp.setMap(map);
      expect(modelProp.map).toBe(map);
    });
     test('setRef', () => {
      const ref = {};
      modelProp.setRef(ref);
      expect(modelProp.ref).toBe(ref);
    });
  });
});
