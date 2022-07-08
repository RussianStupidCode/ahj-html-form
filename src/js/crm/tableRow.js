import UPDATE_IMG from '../../img/pencil.png';
import DELETE_IMG from '../../img/recycle.png';
import { priceFormat } from '../utils';

export default class TableRow {
  constructor(id, title, price) {
    this.el = document.createElement('tr');
    this.el.classList.add('crm-row');
    this.el.dataset.id = id;

    this.titleElement = document.createElement('td');
    this.titleElement.textContent = title;
    this.priceElement = document.createElement('td');
    this.priceElement.textContent = priceFormat(price);

    this.el.insertAdjacentElement('beforeEnd', this.titleElement);
    this.el.insertAdjacentElement('beforeEnd', this.priceElement);

    const contorlsElement = document.createElement('td');
    contorlsElement.innerHTML = `
    <button class="btn d-inline-block control update">
      <img class="control-img" src=${UPDATE_IMG}>
    </button>
    <button class="btn d-inline-block control delete">
      <img class="control-img" src=${DELETE_IMG}>
    </button>`;

    this.el.insertAdjacentElement('beforeEnd', contorlsElement);
  }

  get id() {
    return this.el.dataset.id;
  }

  get title() {
    return this.titleElement.textContent;
  }

  set title(title) {
    this.titleElement.textContent = title;
  }

  get price() {
    return this.priceElement.textContent;
  }

  set price(price) {
    this.titleElement.textContent = priceFormat(price);
  }

  remove() {
    this.el.remove();
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
