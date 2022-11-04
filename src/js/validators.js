// Функция валидации банковских карт
export function isValidCard(value) {

  // Правила для банковских карт
  const RULES_CARDS = [
    ['amex', '^3[47][0-9]{13}$'],
    ['diners', '^3(?:0[0-5]|[68][0-9])[0-9]{11}$'],
    ['discovery', '^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$'],
    ['jcb', '^(?:2131|1800|35\d{3})\d{11}$'],
    ['visa', '^4[0-9]{12}(?:[0-9]{3})?$'],
    ['master', '^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$'],
  ]

  RULES_CARDS.forEach(element => {
    const exp = new RegExp(element[1]);
    console.log(value, element[0], element[1], exp.test(value));
    if (exp.test(value)) {
      return element[0];
    }
  });

  return false;
}