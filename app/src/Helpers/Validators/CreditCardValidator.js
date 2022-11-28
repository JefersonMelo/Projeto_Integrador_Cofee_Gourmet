export function CreditiCardNumberValidator(cardNumber) {
    const regex = /^([0-9]){8,16}$/;
    return regex.test(cardNumber);
}

export function CreditCardNameValidator(cardName) {
    const regex = /[a-zA-Z]+$/;
    return regex.test(cardName);
  }