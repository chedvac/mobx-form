import { formatDate, parseDate } from 'reactUiComponents/DatePicker/utils';

describe('formatDate', function() {
  test('return string date', function() {
    expect(formatDate(new Date(), 'L')).toEqual(expect.any(String));
  });
  test('return string date', function() {
    expect(formatDate(new Date(), 'L')).toEqual(expect.any(String));
  });
});
