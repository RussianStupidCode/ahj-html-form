/* eslint class-methods-use-this: "off" */
/* eslint no-unused-vars: "off" */

import moment from 'moment';
import { getWeekNumberInMonth } from '../../utils';

export default class Day {
  constructor(momentDate) {
    this.momentDate = null;
    this.dayOfMonth = null;
    this.weekOfMonth = null;
    this.dayOfWeek = null; // 0 - monday 6 - sunday

    this.selected = false;
    this.active = false;
    this.fixed = false;

    this.changeMomentDate(momentDate);
  }

  changeMomentDate(newMomentDate) {
    this.momentDate = moment(newMomentDate).startOf('day');
    this.dayOfMonth = newMomentDate.date();
    this.weekOfMonth = getWeekNumberInMonth(this.momentDate);
    this.dayOfWeek = this.momentDate.isoWeekday() - 1;
  }

  get state() {
    return this.dayState;
  }

  get moment() {
    return this.momentDate;
  }

  fix() {
    throw new Error('method "fixed" not impl');
  }

  unfix() {
    throw new Error('method "unfixed" not impl');
  }

  select() {
    throw new Error('method "select" not impl');
  }

  unselect() {
    throw new Error('method "unselect" not impl');
  }

  focus() {
    throw new Error('method "focus" not impl');
  }

  blur() {
    throw new Error('method "blur" not impl');
  }

  activate() {
    throw new Error('method "activate" not impl');
  }

  deactivate() {
    throw new Error('method "deactivate" not impl');
  }
}
