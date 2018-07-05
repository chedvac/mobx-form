import cityList from '../../../services/dataServices/cityProvider';

describe('cityProvider', () => {
  test('cityList to be defined', () => {
    expect(cityList).toBeDefined();
  });
});
