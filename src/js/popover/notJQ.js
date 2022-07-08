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
    const popover = new Popover(title, text, this.el);
    return popover;
  }

  addEventListener(eventString, callback) {
    this.el.addEventListener(eventString, callback);
  }
}

export default function not$(element) {
  return new NotJQ(element);
}
