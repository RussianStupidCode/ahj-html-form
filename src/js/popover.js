export default class Popover {
  /* у одного элемента может быть только 1 popover*/

  static parents = new WeakSet();

  constructor(title, text, parentElement) {
    this.parentEl = parentElement;

    if (Popover.parents.has(parentElement)) {
      this.el = this.parentEl.querySelector('.popover');
      this.titleEl = this.el.querySelector('.popover-title');
      this.textEl = this.el.querySelector('.popover-text');
      this.text = text;
      this.title = title;
      this.open();
      return;
    }

    Popover.parents.add(parentElement);

    this.el = document.createElement('div');
    this.el.classList.add('d-flex', 'flex-column', 'popover');

    this.titleEl = document.createElement('div');
    this.textEl = document.createElement('div');

    const corner = document.createElement('div');
    corner.classList.add('popover-corner');

    this.title = title;
    this.text = text;

    this.titleEl.classList.add('popover-title', 'p-2');
    this.textEl.classList.add('popover-text', 'p-2');

    this.el.insertAdjacentElement('beforeEnd', this.titleEl);
    this.el.insertAdjacentElement('beforeEnd', this.textEl);
    this.el.insertAdjacentElement('beforeEnd', corner);
    this.parentEl.insertAdjacentElement('beforeEnd', this.el);

    this.open();

    this.setListener();
  }

  setListener() {
    window.addEventListener('resize', () => {
      this.move();
    });

    document.body.addEventListener('click', (event) => {
      if (event.target !== this.el && event.target != this.parentEl) {
        this.close();
        return;
      }
    });
  }

  close() {
    this.el.classList.add('d-none');
  }

  open() {
    this.el.classList.remove('d-none');
    this.move();
  }

  set title(title) {
    this.titleEl.textContent = title;
  }

  get title() {
    return this.titleEl.textContent;
  }

  set text(text) {
    this.textEl.textContent = text;
  }

  get text() {
    return this.textEl.textContent;
  }

  move() {
    const { top, left } = this.parentEl.getBoundingClientRect();

    const corner = this.el.querySelector('.popover-corner');

    this.el.style.top = `${
      window.scrollY + top - this.el.offsetHeight - corner.offsetHeight
    }px`;

    this.el.style.left = `${
      window.scrollX +
      left +
      this.parentEl.offsetWidth / 2 -
      this.el.offsetWidth / 2
    }px`;
  }
}
