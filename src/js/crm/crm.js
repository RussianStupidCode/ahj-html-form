import CREATE_IMG from '../../img/create.png';
import Table from './table';

export default class CRM {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add(
      'crm',
      'd-flex',
      'flex-column',
      'align-items-center',
      'border',
      'border-primary',
      'border-2',
      'rounded-3',
      'm-2'
    );

    this.headerEl = document.createElement('div');
    this.headerEl.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'flex-row',
      'crm-header'
    );

    this.headerEl.innerHTML = `
    <span class="m-1 header-title">Товары</span> 
    <button type="button" class="btn control create m-1">
      <img class="control-img" src=${CREATE_IMG}>
    </button>`;

    this.table = new Table();

    this.bodyEl = document.createElement('div');
    this.bodyEl.classList.add('crm-body', 'px-5');

    this.table.bindToDOM(this.bodyEl);

    this.el.insertAdjacentElement('beforeEnd', this.headerEl);
    this.el.insertAdjacentElement('beforeEnd', this.bodyEl);

    this.setListeners();
  }

  setListeners() {}

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
