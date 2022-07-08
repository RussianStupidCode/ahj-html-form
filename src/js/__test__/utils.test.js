import { priceFormat, priceValidate, titleValidate } from '../utils';

const PRICE_FORMAT_TEST_DATA = [
  {
    value: '1000',
    expected: '1 000',
  },
  {
    value: '1 000',
    expected: '1 000',
  },
  {
    value: '10',
    expected: '10',
  },
];

const priceFormatHandler = test.each(PRICE_FORMAT_TEST_DATA);

priceFormatHandler('test price format %s', ({ value, expected }) => {
  const actual = priceFormat(value);

  expect(actual).toBe(expected);
});

const TITLE_VALIDATE_TEST_DATA = [
  {
    value: '',
    expected: {
      isValid: false,
      errorMessage: 'Пустое имя товара',
    },
  },
  {
    value: ' ',
    expected: {
      isValid: false,
      errorMessage: 'Пустое имя товара',
    },
  },
  {
    value: 'good',
    expected: {
      isValid: true,
      errorMessage: '',
    },
  },
];

const titleValidateHandler = test.each(TITLE_VALIDATE_TEST_DATA);

titleValidateHandler('test title validate %s', ({ value, expected }) => {
  const actual = titleValidate(value);

  expect(actual).toEqual(expected);
});

const PRICE_VALIDATE_TEST_DATA = [
  {
    value: '1000',
    expected: {
      isValid: true,
      errorMessage: '',
    },
  },
  {
    value: '1 000',
    expected: {
      isValid: true,
      errorMessage: '',
    },
  },
  {
    value: '1,000',
    expected: {
      isValid: true,
      errorMessage: '',
    },
  },
  {
    value: '1cgfsd23',
    expected: {
      isValid: false,
      errorMessage: 'Некорректная стоимость',
    },
  },
  {
    value: '0',
    expected: {
      isValid: false,
      errorMessage: 'Стоимость должна быть выше 0',
    },
  },
  {
    value: '',
    expected: {
      isValid: false,
      errorMessage: 'Стоимость должна быть выше 0',
    },
  },
];

const priceValidateHandler = test.each(PRICE_VALIDATE_TEST_DATA);

priceValidateHandler('test price validate %s', ({ value, expected }) => {
  const actual = priceValidate(value);

  expect(actual).toEqual(expected);
});
