export default class Input {
  constructor(name, text, type, validateCallback) {
    this.el = document.createElement('div');
    this.el.classList.add(
      'd-flex',
      'flex-column',
      'mb-1',
      'align-items-center',
      'w-100'
    );

    this.validateCallback = validateCallback;

    this.isValid = true;

    const label = document.createElement('label');
    label.textContent = text;

    this.input = document.createElement('input');
    this.input.classList.add('form-control');
    this.input.name = name;
    this.input.type = type;

    this.error = document.createElement('span');
    this.error.classList.add('badge', 'bg-danger', 'd-none', 'mt-2');

    this.el.insertAdjacentElement('beforeend', label);
    this.el.insertAdjacentElement('beforeend', this.input);
    this.el.insertAdjacentElement('beforeend', this.error);
  }

  validate() {
    if (!this.validateCallback) {
      this.hideError();
      return;
    }

    const { errorMessage, isValid } = this.validateCallback(this.value);

    this.error.textContent = errorMessage;

    this.isValid = isValid;

    if (!isValid) {
      this.showError();
      return;
    }

    this.hideError();
  }

  showError() {
    this.error.classList.remove('d-none');
  }

  hideError() {
    this.error.classList.add('d-none');
    this.error.textContent = '';
  }

  get valid() {
    return this.isValid;
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }

  disable() {
    this.input.disabled = true;
  }

  enable() {
    this.input.disabled = false;
  }

  get value() {
    return this.input.value.trim();
  }

  reset() {
    this.input.value = '';
  }

  set value(value) {
    this.input.value = value;
  }
}
