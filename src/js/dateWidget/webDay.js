import Day from './core/day';

export default class WebDay extends Day {
  constructor(momentDate) {
    super(momentDate);

    this.el = document.createElement('button');
    this.el.textContent = momentDate.date();
    this.el.classList.add(
      'btn',
      'p-0',
      'w-100',
      'calendar-cell',
      'text-black-50'
    );
    this.el.classList.add('border', 'border-2');

    this.deactivate();
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }

  focus() {
    if (!this.active || this.fixed) {
      return;
    }

    this.el.classList.add('border-primary');
  }

  blur() {
    if (!this.active || this.fixed) {
      return;
    }

    this.el.classList.remove('border-primary');
  }

  fix() {
    this.fixed = true;
    this.el.classList.add('border', 'border-2', 'border-warning');
  }

  unfix() {
    this.fixed = false;
    this.el.classList.remove('border', 'border-2', 'border-warning');
  }

  select() {
    if (!this.active) {
      return;
    }
    this.el.classList.add('bg-primary', 'text-white');
    this.selected = true;
  }

  unselect() {
    this.el.classList.remove('bg-primary', 'text-white');

    this.selected = false;
  }

  activate() {
    this.active = true;
    this.el.classList.remove('text-black-50');
    this.el.classList.add('active');
  }

  deactivate() {
    this.active = false;
    this.el.classList.add('text-black-50');
    this.el.classList.remove('active');
  }
}
