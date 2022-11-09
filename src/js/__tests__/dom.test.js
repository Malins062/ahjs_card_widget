import CardNumberWidget from '../widget';

test('Should render self', () => {
  document.body.innerHTML = '<div id="widget-container"></div>';

  const container = document.querySelector('#widget-container');
  const widget = new CardNumberWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(CardNumberWidget.imagesCardsHTML + CardNumberWidget.formHTML + 
    CardNumberWidget.descriptionHTML);
});

test('Should validate input', () => {
  document.body.innerHTML = '<div id="widget-container"></div>';

  const container = document.querySelector('#widget-container');
  const widget = new CardNumberWidget(container);

  widget.bindToDOM();

  const input = container.querySelector(CardNumberWidget.inputSelector);
  input.value = '2200240768512994';

  const submit = container.querySelector(CardNumberWidget.submitSelector);
  submit.click();

  expect(input.classList.contains('is-valid')).toBeTruthy();
});
