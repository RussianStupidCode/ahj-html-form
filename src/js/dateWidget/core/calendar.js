import moment from 'moment';
import { getWeekCountInMonth } from '../../utils';

const DAYS_IN_WEEK = 7;

export default class Calendar {
  constructor(momentDate, DayClass, startActiveDate) {
    this.startActiveDate = moment(startActiveDate).startOf('day');
    this.momentDate = null;
    this.month = null;
    this.year = null;

    this.currentSelectDay = null;

    this.DayClass = DayClass;

    this.days = [];
    this.daysForWeek = [];

    this.changeMomentDate(momentDate);
  }

  changeMomentDate(newMomentDate) {
    this.currentSelectDay = null;
    this.momentDate = moment(newMomentDate).startOf('month');
    this.month = newMomentDate.date();
    this.year = newMomentDate.year();

    this.days = this.initDays(this.momentDate);
    this.daysForWeek = Calendar.splitMonthForWeeks(this.days);
  }

  initDays(momentDate) {
    const dayInMonth = momentDate.daysInMonth();

    if (this.currentSelectDay) {
      this.currentSelectDay.unselect();
    }

    const days = new Array(dayInMonth).fill(0).map((_, dayShift) => {
      const day = new this.DayClass(moment(momentDate).add(dayShift, 'days'));
      this.changeDayState(day);
      return day;
    });
    return days;
  }

  static splitMonthForWeeks(days) {
    const weekCountInMonth = getWeekCountInMonth(days[0].momentDate);

    const daysForWeek = new Array(weekCountInMonth)
      .fill(0)
      .map(() => new Array(DAYS_IN_WEEK).fill(null));

    days.forEach((day) => {
      const week = day.weekOfMonth;
      daysForWeek[week][day.momentDate.isoWeekday() - 1] = day;
    });

    return daysForWeek;
  }

  changeDayState(day) {
    if (day.moment < this.startActiveDate) {
      day.deactivate();
    }

    if (day.moment >= this.startActiveDate) {
      day.activate();
    }

    if (day.moment.isSame(this.startActiveDate)) {
      day.fix();
    }
  }

  get tear() {
    return this.momentDate.year();
  }

  get monthName() {
    return this.momentDate.format('MMMM');
  }

  addMonth(count) {
    if (count === 0) {
      return;
    }

    this.changeMomentDate(this.momentDate.add(count, 'months'));
  }

  get selectedDay() {
    return this.currentSelectDay;
  }

  addYear(count) {
    if (count === 0) {
      return;
    }

    this.changeMomentDate(this.momentDate.add(count, 'years'));
  }
}
