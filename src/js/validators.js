// Функция валидации банковских карт
export function isValidCard(value) {

  // Правила для банковских карт
  const RULES_CARDS = [
    {
      class: 'amex',
      titlе: 'American Express',
      regexp: '^3[47][0-9]{13}$',
    },

    {
      class: 'diners',
      titlе: 'Diners Club',
      regexp: '^3(?:0[0-5]|[68][0-9])[0-9]{11}$',
    },

    {
      class: 'diners',
      titlе: 'Diners Club',
      regexp: '^3(?:0[0-5]|[68][0-9])[0-9]{11}$',
    },

    {
      class: 'discover',
      titlе: 'Discovery',
      regexp: '^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$',
    },
    
    {
      class: 'jcb',
      titlе: 'JCB',
      regexp: '^(?:2131|1800|35\d{3})\d{11}$',
    },
    
    {
      class: 'visa',
      titlе: 'VISA',
      regexp: '^4[0-9]{12}(?:[0-9]{3})?$',
    },
    
    {
      class: 'master',
      titlе: 'MasterCard',
      regexp: '^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$',
    },
    
    {
      class: 'mir',
      titlе: 'МИР',
      regexp: '^220([0-4])[0-9]{12}$',
    },

  ]

  if (isValidCheckDigit(value)) {
    for (let rule of RULES_CARDS) {
      const exp = new RegExp(rule.regexp);
      // console.log(value, rule, exp.test(value));
      if (exp.test(value)) {
      // if (exp.test(value)) {
        return rule;
      }
    }  
  }
  return false;
}


// Функция валидации банковских карт по алгоритму MOON
function isValidCheckDigit(cardNumber) {

  const arr = [];
  for(var i = 0; i < cardNumber.length; i++) {
    if(i % 2 === 0) {
      const m = parseInt(cardNumber[i]) * 2;
      if(m > 9) {
        arr.push(m - 9);
      } else {
        arr.push(m);
      } 
    } else {
        const n = parseInt(cardNumber[i]);
        arr.push(n)
      }
  }
  const summ = arr.reduce(function(a, b) { return a + b; });
  return Boolean(!(summ % 10));

}
