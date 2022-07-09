import moment from 'moment';

export function priceToNumber(price) {
  return Number(String(price).replace(/\s+/g, '').replace(/,/, '.'));
}

export function priceFormat(price) {
  const priceNumber = priceToNumber(price);
  return Intl.NumberFormat('ru-RU').format(priceNumber);
}

export function titleValidate(title) {
  const refineTitle = title.trim();

  const result = {
    errorMessage: '',
    isValid: true,
  };

  if (refineTitle.length === 0) {
    result.isValid = false;
    result.errorMessage = 'Пустое имя товара';
  }

  return result;
}

export function priceValidate(price) {
  const result = {
    errorMessage: '',
    isValid: true,
  };

  const priceNumber = priceToNumber(price);

  if (Object.is(NaN, priceNumber)) {
    result.isValid = false;
    result.errorMessage = 'Некорректная стоимость';
  }

  if (priceNumber <= 0) {
    result.isValid = false;
    result.errorMessage = 'Стоимость должна быть выше 0';
  }

  return result;
}

export function getWeekCountInMonth(momentDate) {
  const startMonthWeek = moment(momentDate).startOf('month').isoWeek();
  const endMonthWeek = moment(momentDate).endOf('month').isoWeek();
  return endMonthWeek - startMonthWeek + 1;
}

export function getWeekNumberInMonth(momentDate) {
  const weekInYear = momentDate.isoWeek();
  const startMonth = moment(momentDate).startOf('month');

  return weekInYear - startMonth.isoWeek();
}
