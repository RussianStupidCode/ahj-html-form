/**
 * @jest-environment jsdom
 */

import Popover from '../popover/popover';

test('popover create test', () => {
  const container = document.createElement('div');
  const popoverBtn = document.createElement('button');
  container.append(popoverBtn);

  const popover = new Popover('title', 'text', popoverBtn);

  expect(popover.el.innerHTML).toEqual(
    '<div class="popover-title p-2">title</div><div class="popover-text p-2">text</div><div class="popover-corner"></div>'
  );

  expect(popover.isOpen);
});
