import moment from 'moment';
import WebCalendar from './webCalendar';
import WebDay from './webDay';

export default class InputDate {
  constructor(label, selectDateCallback = () => {}) {
    this.el = document.createElement('div');

    this.el.classList.add(
      'd-flex',
      'flex-column',
      'align-items-start',
      'input-date-block',
      'w-100'
    );

    this.selectDateCallback = selectDateCallback;

    this.el.innerHTML = `
    <label>${label}</label>
    <input class="w-100 border border-2 border-primary input-date rounded" type="text" readonly>`;

    this.input = this.el.querySelector(`input`);

    this.calendar = new WebCalendar(moment(), WebDay, moment(), (day) => {
      this.selectDate(day);
      this.selectDateCallback(day);
    });

    this.calendar.bindToDOM(this.el);

    this.date = null;

    this.setListeners();
  }

  setStartAtiveDate(date) {
    this.calendar.setStartActiveDate(date);
  }

  setListeners() {
    window.addEventListener('resize', () => {
      this.moveCalendar();
    });

    document.body.addEventListener('click', (event) => {
      event.preventDefault();

      const { target } = event;

      if (target.closest('.input-date-block') !== this.el) {
        this.calendar.close();
      }
    });

    this.input.addEventListener('click', (event) => {
      event.preventDefault();

      this.moveCalendar();
      this.calendar.open();
    });
  }

  moveCalendar() {
    this.calendar.move(this.el.offsetHeight + window.scrollY, window.scrollX);
  }

  selectDate(day) {
    this.date = day.moment;

    this.input.value = day.moment.format('DD.MM.YY, ddd');
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }

  open() {
    this.el.classList.remove('d-none');
  }

  reset() {
    this.date = null;
    this.input.value = '';
  }

  isOpen() {
    return !this.el.classList.contains('d-none');
  }

  close() {
    this.el.classList.add('d-none');
    this.calendar.close();
  }

  get value() {
    return this.date;
  }
}
