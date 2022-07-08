import CREATE_IMG from '../../img/create.png';
import { priceValidate, titleValidate } from '../utils';
import { CONTROL_TYPES, getContolType } from './control_types';
import CRUDModal from './crudModal';
import Input from './input';
import Table from './table';

export default class CRM {
  constructor() {
    this.counterId = 0;
    this.lastSelectedItemId = null;

    this.nonactiveFilter = document.createElement('div');
    this.nonactiveFilter.classList.add('nonactive-filter');

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

    this.crudModal = new CRUDModal(
      this.deleteItem.bind(this),
      this.updateItem.bind(this),
      this.createItem.bind(this),
      this.unblockingCRM.bind(this)
    );

    this.crudModal.bindToDOM(this.el);
    this.createCRUDModalInputs();

    this.setListeners();
  }

  createCRUDModalInputs() {
    const titleInput = new Input('title', 'Название', 'text', titleValidate);
    this.crudModal.addInput('title', titleInput);

    const priceInput = new Input('title', 'Стоимость', 'text', priceValidate);
    this.crudModal.addInput('price', priceInput);
  }

  setListeners() {
    this.el.addEventListener('click', (event) => {
      const { target } = event;

      const control = target.closest('.control');

      if (!control) {
        return;
      }

      const controlType = getContolType(control);

      if (controlType === CONTROL_TYPES.create) {
        this.blockingCRM();
        this.crudModal.open('Добавление товара', CONTROL_TYPES.create);
        return;
      }

      if (controlType === CONTROL_TYPES.delete) {
        this.blockingCRM();
        this.lastSelectedItemId = control.closest('.crm-row').dataset.id;

        const item = this.table.getItem(this.lastSelectedItemId);

        this.crudModal.setInput('title', item.title);
        this.crudModal.setInput('price', item.price);

        this.crudModal.open(
          'Вы действительно хотите удалить?',
          CONTROL_TYPES.delete
        );
      }

      if (controlType === CONTROL_TYPES.update) {
        this.blockingCRM();
        this.lastSelectedItemId = control.closest('.crm-row').dataset.id;

        const item = this.table.getItem(this.lastSelectedItemId);

        this.crudModal.setInput('title', item.title);
        this.crudModal.setInput('price', item.price);

        this.crudModal.open(
          `Обновление товара ${item.title}`,
          CONTROL_TYPES.update
        );
      }
    });
  }

  createItem() {
    const title = this.crudModal.getInput('title');
    const price = this.crudModal.getInput('price');

    this.table.addNewItem(this.counterId, title, price);
    this.counterId += 1;

    this.unblockingCRM();
  }

  deleteItem() {
    this.table.deleteItem(this.lastSelectedItemId);

    this.unblockingCRM();
  }

  updateItem() {
    const title = this.crudModal.getInput('title');
    const price = this.crudModal.getInput('price');

    this.table.updateItem(this.lastSelectedItemId, title, price);
    this.unblockingCRM();
  }

  blockingCRM() {
    this.nonactiveFilter.classList.remove('d-none');
  }

  unblockingCRM() {
    this.nonactiveFilter.classList.add('d-none');
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
    parentEl.insertAdjacentElement('beforeEnd', this.nonactiveFilter);
    this.unblockingCRM();
  }
}
