import InputDate from './inputDate';

export default class InputDateWidget {
  constructor() {
    this.el = document.createElement('div');
    this.el.classList.add(
      'input-date-widget',
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-center'
    );

    this.isBackward = false;

    this.noBackwardInput = new InputDate('Дата:');

    this.backwardInput = new InputDate('Обратно:');

    this.departureInput = new InputDate('Туда:', (day) => {
      this.backwardInput.setStartAtiveDate(day.moment);

      if (this.backwardInput.value < this.departureInput.value) {
        this.backwardInput.reset();
      }
    });

    this.dateRangeInputBlock = document.createElement('div');
    this.dateRangeInputBlock.classList.add(
      'd-flex',
      'flex-row',
      'justyfy-content-beetwen',
      'align-items-center',
      'w-100'
    );

    this.noBackwardInput.bindToDOM(this.el);
    this.departureInput.bindToDOM(this.dateRangeInputBlock);
    this.backwardInput.bindToDOM(this.dateRangeInputBlock);

    this.el.insertAdjacentElement('beforeEnd', this.dateRangeInputBlock);

    this.backward = false;
  }

  set backward(value) {
    this.isBackward = value;

    if (this.isBackward) {
      this.noBackwardInput.close();
      this.dateRangeInputBlock.classList.remove('d-none');
      return;
    }

    this.dateRangeInputBlock.classList.add('d-none');
    this.noBackwardInput.open('d-none');
  }

  get departureDate() {
    if (!this.isBackward) {
      return this.noBackwardInput.value;
    }

    return this.departureDate.value;
  }

  get backwardDate() {
    if (!this.isBackward) {
      return null;
    }

    return this.backwardInput.value;
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
