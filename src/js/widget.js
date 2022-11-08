import { isValidCard } from './validators';

export default class CardNumberWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.lastActiveCardEl = undefined;
  }

  static markup(showImages=true, showDescription=true) {
    const formHTML = `
        <form id="form" class="cardnumber-form-widget form-inline row g-2" novalidate="novalidate">
          <div class="form-group col-md-8 mt-1">
              <input class="form-control" id="cardnumber-input" name="card_number" type="text" placeholder="Введите номер карты" aria-describedby="cardnumber-feeddback">
              <div id="cardnumber-invalid-feedback" class="invalid-feedback">Карта не идентифицирована</div>
              <div id="cardnumber-valid-feedback" class="valid-feedback">Карта не идентифицирована</div>
          </div>
          <button type="submit" id="cardnumber-submit" class="submit btn btn-success col-md-4 mt-1" title="Нажмите для проверки карты">Проверить</button>
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
                    <th>Примеры номеров</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>American Express</td>
                    <th class="d-flex justify-content-center"><div class="card amex" title="American Express"></div></th>
                    <td>348446461372266</td>
                </tr>
                <tr>
                    <td>Diners Club</td>
                    <th class="d-flex justify-content-center"><div class="card diners" title="Diners Club"></div></th>
                    <td>36471414338070</td>
                </tr>
                <tr>
                    <td>Discover</td>
                    <th class="d-flex justify-content-center"><div class="card discover" title="Discover"></div></th>
                    <td>6011168785829283</td>
                </tr>
                <tr>
                    <td>JCB</td>
                    <th class="d-flex justify-content-center"><div class="card jcb" title="JCB"></div></th>
                    <td>3529992726838059</td>
                </tr>
                <tr>
                    <td>MasterCard</td>
                    <th class="d-flex justify-content-center"><div class="card master" title="MasterCard"></div></th>
                    <td>5346028387436812</td>
                </tr>
                <tr>
                    <td>Visa</td>
                    <th class="d-flex justify-content-center"><div class="card visa" title="Visa"></div></th>
                    <td>4556737586899855</td>
                </tr>
                <tr>
                    <td>МИР</td>
                    <th class="d-flex justify-content-center"><div class="card mir" title="МИР"></div></th>
                    <td>2200240768512994</td>
                </tr>
            </tbody>
        </table>`;

    let innerHTML = showImages ? imagesCardsHTML + formHTML : formHTML;
    innerHTML = showDescription ? innerHTML + descriptionHTML: innerHTML;
    return innerHTML;
  }

  static get inputSelector() {
    return '[id=cardnumber-input]';
  }

  static get submitSelector() {
    return '[id=cardnumber-submit]';
  }
  
  static get validFeedbackSelector() {
    return '[id=cardnumber-valid-feedback]';
  }
  
  bindToDOM(showImages=false, showDescription=false) {
    /*
      Параметры:
        showImages - показывать/не показывать изображения карт (по умолчанию - не показывать)
        showDescription - показывать/не показывать описание карт (по умолчанию - не показывать)
    */

    this.showImages = showImages;
    this.parentEl.innerHTML = this.constructor.markup(this.showImages, showDescription);
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    // console.log(this.parentEl, this.constructor.submitSelector, submit);
    submit.addEventListener('click', evt => this.onSubmit(evt));
  }

  onSubmit(evt) {
    evt.preventDefault();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector),
      validCard = isValidCard(inputEl.value);
    // console.log(validCard);
    if (!validCard) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
      if (this.showImages && this.lastActiveCardEl !== undefined) {
          this.lastActiveCardEl.classList.add('disabled');
      } 


    } else {
      const feedbackEl = this.parentEl.querySelector(this.constructor.validFeedbackSelector);
      feedbackEl.innerHTML = `Карта идентифицирована - ${validCard.titlе}`;

      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');

      if (this.showImages) {
        if (this.lastActiveCardEl !== undefined) {
          this.lastActiveCardEl.classList.add('disabled');
        } 
        const cardEl = this.parentEl.querySelector(`.${validCard.class}`);
        // console.log(validCard, cardEl);
        cardEl.classList.remove('disabled');
        this.lastActiveCardEl = cardEl;  
      }
    }
  }
}
