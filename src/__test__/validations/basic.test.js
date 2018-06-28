import { maxlength, minlength, length } from "../../validations/basic";

describe("basicValidation", () => {
  describe("maxlength", () => {
    test("should be defined", () => {
      expect(maxlength).toBeDefined();
    });

    describe("validator", () => {
      test("should return true", () => {
        const max = maxlength({ value: 8 });
        expect(max.validator("123").isValid).toBeTruthy();
      });

      test("should return false", () => {
        const max = maxlength({ value: 8 });
        expect(max.validator("1234567890").isValid).toBeFalsy();
      });
    });

    describe("message", () => {
      test("should be", () => {
        const max = maxlength({ value: 8 });
        expect(max.message()).toEqual("יש להזין עד 8 תווים");
      });
    });
  });

  describe("minlength", () => {
    test("should be defined", () => {
      expect(minlength).toBeDefined();
    });

    describe("validator", () => {
      test("should return false", () => {
        const max = minlength({ value: 8 });
        expect(max.validator("123").isValid).toBeFalsy();
      });

      test("should return true", () => {
        const max = minlength({ value: 8 });
        expect(max.validator("1234567890").isValid).toBeTruthy();
      });
    });

    describe("message", () => {
      test("should be", () => {
        const max = minlength({ value: 8 });
        expect(max.message()).toEqual("יש להזין לפחות 8 תווים");
      });
    });
  });

  describe("length", () => {
    test("should be defined", () => {
      expect(length).toBeDefined();
    });

    describe("validator", () => {
      test("should return false", () => {
        const max = length({ value: 8 });
        expect(max.validator("123").isValid).toBeFalsy();
      });

      test("should return true", () => {
        const max = length({ value: 8 });
        expect(max.validator("1234567890").isValid).toBeFalsy();
      });

      test("should return true", () => {
        const max = length({ value: 8 });
        expect(max.validator("12345678").isValid).toBeTruthy();
      });
    });

    describe("message", () => {
      test("should be", () => {
        const max = length({ value: 8 });
        expect(max.message("123456789")).toEqual(""); //יש להזין 8 תווים
      });
    });
  });
});
