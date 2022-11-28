export function CVC_CodeValidator(code) {
    const regex = /^([0-9]){3}$/;
    return regex.test(code);
  }