import { url } from "../../validations/address";

describe("address", () => {
  describe("url", () => {
    test("should be defined", () => {
      expect(url).toBeDefined();
    });

    describe("validator", () => {
      const urlvalidation = url();
      test("value undefined, null or empty", () => {
        expect(urlvalidation.validator(undefined).isValid).toBeTruthy();
        expect(urlvalidation.validator("").isValid).toBeTruthy();
        expect(urlvalidation.validator(null).isValid).toBeTruthy();
      });

      test("value too short", () => {
        expect(urlvalidation.validator("hey").isValid).toBeFalsy();
      });

      test("value not valid", () => {
        expect(urlvalidation.validator("test.test").isValid).toBeFalsy();
        expect(
          urlvalidation.validator("http://te>t.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://te't.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://te{st.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://t!est.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://te^st.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://te,st.test.com").isValid
        ).toBeFalsy();
        expect(
          urlvalidation.validator("http://te*st.test.com").isValid
        ).toBeFalsy();
      });

      test("value valid", () => {
        expect(
          urlvalidation.validator("http://test.test.com").isValid
        ).toBeTruthy();
        expect(
          urlvalidation.validator("https://test.test.com").isValid
        ).toBeTruthy();
        expect(urlvalidation.validator("www.test.com").isValid).toBeTruthy();
        expect(urlvalidation.validator("WWW.TEST.COM").isValid).toBeTruthy();
        expect(
          urlvalidation.validator("HTTPS://WWW.TEST.COM").isValid
        ).toBeTruthy();
        expect(urlvalidation.validator("wWw.TeSt.CoM").isValid).toBeTruthy();
        expect(
          urlvalidation.validator("HtTp://WwW.tEsT.cOm").isValid
        ).toBeTruthy();
        expect(
          urlvalidation.validator("hTtPs://WWW.test.COM").isValid
        ).toBeTruthy();
      });
    });

    describe("message", () => {
      test("default", () => {
        const urlvalidation = url();
        expect(urlvalidation.message()).toEqual("");
      });
      test("custom", () => {
        const urlvalidation = url({ message: () => "no such url" });
        expect(urlvalidation.message()).toEqual("no such url");
      });
    });
  });
});
