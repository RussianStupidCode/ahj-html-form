import moment from 'moment';
import CRM from './crm/crm';
import InputDateWidget from './dateWidget/inputDateWidget';
import not$ from './popover/notJQ';

moment.locale('ru');

const controls = document.querySelector('.controls');
const field = document.querySelector('.field');

function createControlButton(text, uniqueClass, callback) {
  const btn = document.createElement('button');
  btn.classList.add(
    'btn',
    'bg-primary',
    'text-white',
    'm-2',
    'p-2',
    uniqueClass
  );
  btn.textContent = text;

  btn.addEventListener('click', (event) => {
    field.innerHTML = '';
    callback(event);
  });

  controls.insertAdjacentElement('beforeEnd', btn);
}

createControlButton('popover (#1)', 'popover-start-button', () => {
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

createControlButton('CRM (#2)', 'crm-start-button', () => {
  field.classList.remove('field-center');

  const crm = new CRM();
  crm.bindToDOM(field);
});

createControlButton('date widget (#3)', 'date-widget-start-button', () => {
  field.classList.add('field-center');
  field.innerHTML = `
  <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">
  <label class="btn btn-outline-primary" for="btn-check-outlined">Туда и обратно</label>
  <div class="w-50 d-flex flex-column justify-content-center align-items-center"></div>
  `;

  const checkbox = field.querySelector('label.btn');
  const innput = field.querySelector('input[type="checkbox"]');

  const container = field.querySelector('div');

  const inputDate = new InputDateWidget();

  checkbox.addEventListener('click', (event) => {
    event.preventDefault();
    innput.checked = !innput.checked;
    inputDate.backward = innput.checked;
  });

  inputDate.bindToDOM(container);
});
