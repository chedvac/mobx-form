import { email, url } from '../../rules/address';
import validationsManager from '../../core/ValidationsManager';

describe('email', () => {
  const emailValidation = email();
  test('should be defined', () => {
    expect(email).toBeDefined();
  });

  test('should return instance of validationsManager', () => {
    expect(typeof email()).toEqual('object');
    expect(email()).toBeInstanceOf(validationsManager);
  });

  test('value undefined, null or empty', () => {
    expect(emailValidation.validate(undefined).isValid).toBeTruthy();
    expect(emailValidation.validate(null).isValid).toBeTruthy();
    expect(emailValidation.validate('').isValid).toBeTruthy();
  });

  test('value not valid', () => {
    expect(emailValidation.validate('text#example.com').isValid).toBeFalsy();
    expect(emailValidation.validate('text@exam ple.com').isValid).toBeFalsy();
    expect(emailValidation.validate('text@examp@le.com').isValid).toBeFalsy();
    expect(emailValidation.validate('text@exa%mple.com').isValid).toBeFalsy();
    expect(emailValidation.validate('text#example').isValid).toBeFalsy();
    expect(emailValidation.validate('text#example').message).toEqual(
      'עליך להזין כתובת אימייל תקנית באותיות לועזיות וללא רווחים, במבנה X@X.XX'
    );
  });

  test('invalid domain', () => {
    expect(emailValidation.validate('john@abc.com123').isValid).toBeFalsy();
    expect(emailValidation.validate('john@abc.com123').message).toEqual(
      'עליך להזין כתובת אימייל תקנית באותיות לועזיות וללא רווחים, במבנה X@X.XX'
    );
  });

  test('value too long', () => {
    expect(
      emailValidation.validate(
        'testttttttttttttttttttttttttttttttttttt@example.com'
      ).isValid
    ).toBeFalsy();
    expect(
      emailValidation.validate(
        'testttttttttttttttttttttttttttttttttttt@example.com'
      ).message
    ).toEqual('עליך להזין עד 50 תווים');
  });

  test('value valid', () => {
    expect(emailValidation.validate('text@example.com').isValid).toBeTruthy();
    expect(emailValidation.validate('text@example1.com').isValid).toBeTruthy();
    expect(emailValidation.validate('text1@example.com').isValid).toBeTruthy();
    expect(
      emailValidation.validate('text@example-dd.com').isValid
    ).toBeTruthy();
    expect(emailValidation.validate('aaa@aaa.com').message).toEqual('');
  });
});

describe('url', () => {
  const urlValidation = url();
  test('should be defined', () => {
    expect(url).toBeDefined();
  });

  test('should return instance of validationsManager', () => {
    expect(typeof urlValidation).toEqual('object');
    expect(urlValidation).toBeInstanceOf(validationsManager);
  });

  test('value undefined, null or empty', () => {
    expect(urlValidation.validate(undefined).isValid).toBeTruthy();
    expect(urlValidation.validate(null).isValid).toBeTruthy();
    expect(urlValidation.validate('').isValid).toBeTruthy();
  });

  test('value not valid', () => {
    expect(urlValidation.validate('test.test').isValid).toBeFalsy();
    expect(urlValidation.validate('http://te>t.test.com').isValid).toBeFalsy();
    expect(urlValidation.validate(`http://te't.test.com`).isValid).toBeFalsy();
    expect(urlValidation.validate('http://te{st.test.com').isValid).toBeFalsy();
    expect(urlValidation.validate('http://t!est.test.com').isValid).toBeFalsy();
    expect(urlValidation.validate('http://te,st.test.com').isValid).toBeFalsy();
    expect(urlValidation.validate('http://te*st.test.com').isValid).toBeFalsy();

    expect(urlValidation.validate('http://te,st.test.com').message).toEqual(
      'עליך להזין תחילת כתובת במבנה WWW או HTTP'
    );
  });

  test('value valid', () => {
    expect(urlValidation.validate('hTtPs://WWW.test.COM').isValid).toBeTruthy();
    expect(urlValidation.validate('HtTp://WwW.tEsT.cOm').isValid).toBeTruthy();
    expect(urlValidation.validate('wWw.TeSt.CoM').isValid).toBeTruthy();
    expect(urlValidation.validate('HTTPS://WWW.TEST.COM').isValid).toBeTruthy();
    expect(urlValidation.validate('HTTP://WWW.TEST.COM').isValid).toBeTruthy();
    expect(urlValidation.validate('WWW.TEST.COM').isValid).toBeTruthy();
    expect(urlValidation.validate('www.test.com').isValid).toBeTruthy();
    expect(
      urlValidation.validate('https://test.test.com').isValid
    ).toBeTruthy();
    expect(urlValidation.validate('http://test.test.com').isValid).toBeTruthy();

    expect(urlValidation.validate('http://test.test.com').message).toEqual('');
  });
});
