/**
 * @jest-environment jsdom
 */

import InputDateWidget from '../dateWidget/inputDateWidget';

test('input date test', () => {
  const container = document.createElement('div');

  const inputDate = new InputDateWidget();
  inputDate.backward = false;

  inputDate.bindToDOM(container);

  expect(!inputDate.isBackward);
  expect(!inputDate.departureInput.isOpen());
  expect(!inputDate.backwardInput.isOpen());
  expect(inputDate.noBackwardInput.isOpen());
});
