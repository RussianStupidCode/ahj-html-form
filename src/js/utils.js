export function priceFormat(price) {
  const priceNumber = Number(price.replace(' ', ''));
  return priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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

  const priceNumber = Number(price.replace(/[ ,]/, ''));

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
