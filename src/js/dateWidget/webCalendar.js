import moment from 'moment';
import Calendar from './core/calendar';

import PREV_IMG from '../../img/prev.png';
import NEXT_IMG from '../../img/next.png';

export default class WebCalendar extends Calendar {
  static createDayTableElement(day) {
    const td = document.createElement('td');
    td.classList.add('day');
    if (day === null) {
      td.classList.add('empty');
      return td;
    }

    td.dataset.day = day.dayOfMonth - 1;
    day.bindToDOM(td);

    return td;
  }

  constructor(momentDate, DayClass, startActiveDate, selectCellCallback) {
    super(momentDate, DayClass, startActiveDate);

    this.selectCellCallback = selectCellCallback;

    this.el = document.createElement('div');
    this.el.classList.add(
      'calendar',
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center'
    );

    this.el.innerHTML = `
    <div class="calendar-header d-flex justify-content-between align-items-center">
      <button type="button" class="btn calendar-control prev-month">
        <img class="control-img" src=${PREV_IMG}>
      </button>

      <span class="calendar-title">${this.monthName} ${this.year}</span>

      <button type="button" class="btn calendar-control next-month">
        <img class="control-img" src=${NEXT_IMG}>
      </button>
    </div>`;

    this.title = this.el.querySelector('.calendar-title');
    this.previousMonthButton = this.el.querySelector('.prev-month');
    this.nextMonthButton = this.el.querySelector('.next-month');

    this.table = document.createElement('table');
    this.renderCalendar();

    this.setListeners();
    this.close();
  }

  renderCalendar() {
    this.table.remove();
    this.table = this.createCalendarTable();
    this.title.textContent = `${this.monthName} ${this.year}`;
    this.el.insertAdjacentElement('beforeend', this.table);
    this.previousMonthButton.classList.remove('grayscale');

    if (this.isCurrentMonth()) {
      this.previousMonthButton.classList.add('grayscale');
    }
  }

  createCalendarTable() {
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'calendar-table', 'm-0');

    table.innerHTML = `
    <thead class="w-100">
        <tr>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Пн'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Вт'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Ср'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Чт'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Пт'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Сб'}</th>
          <th class="p-0"><span class="badge week-day w-100 m-0 p-0">${'Вс'}</th>
        </tr>
      </thead>`;

    const tableBody = document.createElement('tbody');
    tableBody.classList.add('w-100');

    this.daysForWeek.forEach((week) => {
      const tableRow = document.createElement('tr');

      week.forEach((day) => {
        tableRow.insertAdjacentElement(
          'beforeEnd',
          WebCalendar.createDayTableElement(day)
        );
      });

      tableBody.insertAdjacentElement('beforeEnd', tableRow);
    });

    table.insertAdjacentElement('beforeEnd', tableBody);

    return table;
  }

  setListeners() {
    this.el.addEventListener('click', (event) => {
      const { target } = event;

      const cell = target.closest('.day');

      if (cell && cell.dataset.day) {
        this.select(cell.dataset.day);

        if (this.currentSelectDay) {
          this.selectCellCallback(this.currentSelectDay);
        }
      }
    });

    this.el.addEventListener('mouseover', (event) => {
      const { target } = event;

      const cell = target.closest('.day');

      if (cell && cell.dataset.day) {
        this.day = this.days[cell.dataset.day];
        this.day.focus();
      }
    });

    this.el.addEventListener('mouseout', (event) => {
      const { target } = event;

      const cell = target.closest('.day');

      if (cell && cell.dataset.day) {
        this.day = this.days[cell.dataset.day];
        this.day.blur();
      }
    });

    this.nextMonthButton.addEventListener('click', (event) => {
      const { target } = event;

      const btn = target.closest('.next-month');

      if (!btn) {
        return;
      }

      this.addMonth(1);
      this.renderCalendar();
    });

    this.previousMonthButton.addEventListener('click', (event) => {
      const { target } = event;

      const btn = target.closest('.prev-month');

      if (!btn || this.isCurrentMonth()) {
        return;
      }

      this.addMonth(-1);
      this.renderCalendar();
    });
  }

  isCurrentMonth() {
    return this.momentDate.isSame(moment().startOf('month'));
  }

  select(dayIndex) {
    this.day = this.days[dayIndex];

    if (!this.day.active) {
      return;
    }

    if (this.currentSelectDay) {
      this.currentSelectDay.unselect();
    }

    this.day.select();
    this.currentSelectDay = this.day;
  }

  close() {
    this.el.classList.add('d-none');
  }

  open() {
    this.changeMomentDate(moment());
    this.renderCalendar();
    this.el.classList.remove('d-none');
  }

  move(top, left) {
    this.el.style.top = `${top}px`;
    this.el.style.left = `${left}px`;
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
