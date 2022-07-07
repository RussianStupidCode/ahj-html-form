import { PAYMENT_SYSTEM_NUMBER } from './payment_system';

export function refineCardNumber(cardNumber) {
  return cardNumber.replace(/\D/g, '');
}

export function luhnAlgorithm(card) {
  const cardNumbers = refineCardNumber(card).split('').map(Number);

  let checksum = cardNumbers[cardNumbers.length - 1];
  const parity = (cardNumbers.length - 2) % 2;

  for (const [index, num] of cardNumbers.slice(0, -1).entries()) {
    let buffer = num;

    if (index % 2 === parity) {
      buffer *= 2;
    }
    if (buffer > 9) {
      buffer -= 9;
    }

    checksum += buffer;
  }

  return checksum % 10 === 0;
}

export function getPaymentSystem(card) {
  const cardNumbers = refineCardNumber(card);
  const paymentSystemNumber = `${cardNumbers[0]}${cardNumbers[1]}`;
  const paymentSystem = PAYMENT_SYSTEM_NUMBER[paymentSystemNumber];

  if (!paymentSystem) {
    return PAYMENT_SYSTEM_NUMBER[cardNumbers[0]];
  }

  return paymentSystem;
}
