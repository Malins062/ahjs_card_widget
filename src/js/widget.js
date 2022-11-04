import { isValidCard } from './validators';

export default class CardNumberWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static markup(showImages=true, showDescription=true) {
    const formHTML = `
        <form id="form" class="form-inline row g-2" novalidate="novalidate">
          <div class="form-group col-md-8 mt-1">
              <input class="form-control" data-id="cardnumber-input" name="card_number" type="text" placeholder="Введите номер карты" aria-describedby="cardnumber-feeddback">
              <div id="cardnumber-feeddback" class="invalid-feedback">Карта не идентифицирована</div>
          </div>
          <button type="submit" data-id="cardnumber-submit" class="btn btn-success col-md-4 mt-1" title="Нажмите для проверки карты">Проверить</button>
        </form>`,
      imagesCardsHTML = `
        <ul class="cards list-unstyled">
          <li><span class="card visa disabled" title="Visa"></span></li>
          <li><span class="card master disabled" title="Mastercard"></span></li>
          <li><span class="card amex disabled" title="American Express"></span></li>
          <li><span class="card discover disabled" title="Discover"></span></li>
          <li><span class="card jcb disabled" title="JCB"></span></li>
          <li><span class="card diners disabled" title="Diners Club"></span></li>
          <li><div class="card mir disabled" title="МИР"></div></li>
        </ul>
        `,
      descriptionHTML = `
        <h3 class="text-center mt-2">Примеры номеров банковских карт</h3>
        <table class="table table-striped table-bordered" style="width:100%">
            <thead class="text-center">
                <tr class="">
                    <th>Тип карты</th>
                    <th>Логотип</th>
                    <th>Допустимый номер</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>American Express</td>
                    <th class="d-flex justify-content-center"><div class="card amex" title="American Express"></div></th>
                    <td>371449635398431</td>
                </tr>
                <tr>
                    <td>Diners Club</td>
                    <th class="d-flex justify-content-center"><div class="card diners" title="Diners Club"></div></th>
                    <td>30569309025904</td>
                </tr>
                <tr>
                    <td>Discover</td>
                    <th class="d-flex justify-content-center"><div class="card discover" title="Discover"></div></th>
                    <td>6011111111111117</td>
                </tr>
                <tr>
                    <td>JCB</td>
                    <th class="d-flex justify-content-center"><div class="card jcb" title="JCB"></div></th>
                    <td>3530111333300000</td>
                </tr>
                <tr>
                    <td>MasterCard</td>
                    <th class="d-flex justify-content-center"><div class="card master" title="MasterCard"></div></th>
                    <td>5555555555554444</td>
                </tr>
                <tr>
                    <td>Visa</td>
                    <th class="d-flex justify-content-center"><div class="card visa" title="Visa"></div></th>
                    <td>4111111111111111</td>
                </tr>
                <tr>
                    <td>МИР</td>
                    <th class="d-flex justify-content-center"><div class="card mir" title="МИР"></div></th>
                    <td>2111111111111111</td>
                </tr>
            </tbody>
        </table>`;

    let innerHTML = showImages ? imagesCardsHTML + formHTML : formHTML;
    innerHTML = showDescription ? innerHTML + descriptionHTML: innerHTML;
    return innerHTML;
  }

  static get inputSelector() {
    return '[data-id=cardnumber-input]';
  }

  static get submitSelector() {
    return '[data-id=cardnumber-submit]';
  }
  
  bindToDOM(showImages=false, showDescription=false) {
    /*
      Параметры:
        showImages - показывать/не показывать изображения карт (по умолчанию - не показывать)
        showDescription - показывать/не показывать описание карт (по умолчанию - не показывать)
    */

    this.parentEl.innerHTML = this.constructor.markup(showImages, showDescription);
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    // console.log(this.parentEl, this.constructor.submitSelector, submit);
    submit.addEventListener('click', evt => this.onSubmit(evt));
  }

  onSubmit(evt) {
    evt.preventDefault();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector),
      validCard = isValidCard(inputEl.value);
    console.log(validCard);
    if (validCard) {
      inputEl.classList.remove('is-invalid');
    } else {
      inputEl.classList.add('is-invalid');
    }
  }
}
