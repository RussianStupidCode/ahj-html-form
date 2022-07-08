import TableRow from './tableRow';

export default class Table {
  constructor() {
    this.el = document.createElement('table');
    this.el.classList.add('table');

    this.items = [];

    this.el.innerHTML =
      '<thead><tr><th scope="col">Название</th><th scope="col">Стоимость</th><th scope="col">Действия</th></tr></thead>';

    this.body = document.createElement('tbody');

    this.el.insertAdjacentElement('beforeEnd', this.body);
  }

  deleteItem(id) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return;
    }

    const item = this.items[itemIndex];
    item.remove();
    this.items.splice(itemIndex, 1);
  }

  addNewItem(id, title, price) {
    const item = new TableRow(id, title, price);
    this.items.push(item);

    item.bindToDOM(this.body);
  }

  updateItem(id, title, price) {
    const item = this.getItem(id);

    if (!item) {
      return;
    }

    item.title = title;
    item.price = price;
  }

  getItem(id) {
    return this.items.find((item) => item.id === id);
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
