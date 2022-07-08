import CRM from './crm/crm';
import not$ from './popover/notJQ';

const controls = document.querySelector('.controls');
const field = document.querySelector('.field');

function createControlButton(text, callback) {
  const btn = document.createElement('button');
  btn.classList.add('btn', 'bg-primary', 'text-white', 'm-2', 'p-2');
  btn.textContent = text;

  btn.addEventListener('click', (event) => {
    field.innerHTML = '';
    callback(event);
  });

  controls.insertAdjacentElement('beforeEnd', btn);
}

createControlButton('popover (#1)', () => {
  const btnEl = document.createElement('button');
  btnEl.classList.add('btn', 'bg-primary', 'text-white');
  btnEl.textContent = 'Click Me';

  field.append(btnEl);
  field.classList.add('field-center');

  const btn = not$(btnEl);
  btn.addEventListener('click', () => {
    btn.popover('Popover title', 'some text');
  });
});

createControlButton('CRM (#2)', () => {
  field.classList.remove('field-center');

  const crm = new CRM();
  crm.bindToDOM(field);
});
