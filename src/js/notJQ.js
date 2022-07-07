import Popover from './popover';

class NotJQ {
  constructor(element) {
    this.el = null;
    if (typeof element === 'string') {
      this.el = document.querySelector(element);
    }

    if (element.tagName !== undefined) {
      this.el = element;
    }
  }

  popover(title, text) {
    new Popover(title, text, this.el);
  }

  addEventListener(eventString, callback) {
    this.el.addEventListener(eventString, callback);
  }
}

export default function not$(element) {
  return new NotJQ(element);
}
