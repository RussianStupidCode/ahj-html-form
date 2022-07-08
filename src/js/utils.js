export function priceFormat(price) {
  const priceNumber = Number(price);
  return priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function empty() {
  console.log('empty');
}
