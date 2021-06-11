export function isCPFValid(strCPF: string): boolean {
  const cpf = strCPF.replace(/[\s.-]*/gim, '');
  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10), 10)) return false;
  sum = 0;
  for (let i = 1; i <= 10; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}
