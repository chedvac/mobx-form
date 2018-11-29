import dialog from 'mobx-business-components/dialog';
import { isObservable } from 'mobx';

describe('dialog ', () => {
  describe('public methods ', () => {
    test('alert', () => {
      expect(dialog.alert).toBeDefined();
    });
    test('confirm', () => {
      expect(dialog.confirm).toBeDefined();
    });
    test('open', () => {
      expect(dialog.open).toBeDefined();
    });
    test('close', () => {
      expect(dialog.close).toBeDefined();
    });
  });
  describe('settings ', () => {
    test('is observable', () => {
      expect(isObservable(dialog.settings)).toBeTruthy();
    });
  });
  describe('alert ', () => {
    test('return promise', () => {
      expect(typeof dialog.alert().then === 'function').toBeTruthy();
    });
    test('has one button', () => {
      jest.spyOn(dialog, '_getButtonsByType');
      dialog.alert();
      expect(dialog._getButtonsByType).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'alert'
        })
      );

      expect(
        Object.keys(
          dialog._getButtonsByType({
            type: 'alert'
          }).buttons
        ).length
      ).toEqual(1);
    });
  });
  describe('confirm ', () => {
    test('return promise', () => {
      expect(typeof dialog.confirm().then === 'function').toBeTruthy();
    });
    test('has two buttons', () => {
      jest.spyOn(dialog, '_getButtonsByType');
      dialog.confirm();
      expect(dialog._getButtonsByType).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'confirm'
        })
      );
      expect(
        Object.keys(
          dialog._getButtonsByType({
            type: 'confirm'
          }).buttons
        ).length
      ).toEqual(2);
    });
  });
  describe('open ', () => {
    test('merge defaultSettings', () => {
      dialog.open({ title: 'my title' });
      expect(dialog.settings.title).toEqual('my title');
    });
    test('settings.isOpen = true', () => {
      dialog.open();
      expect(dialog.settings.isOpen).toBeTruthy();
    });
  });
  describe('close ', () => {
    test('settings.isOpen = false', () => {
      dialog.close();
      expect(dialog.settings.isOpen).toBeFalsy();
    });
  });
});
