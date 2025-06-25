const substrBeforeSymbol = (str, symbol) => {
  let res = str;
  if(str.indexOf(symbol) !== -1){
    res = res.substring(0, str.indexOf(symbol)).trim();
  }
  return res;
}

const convertCurrency = (symbol) => {
  const currencies = new Map();

  currencies.set('$', 'USD');
  currencies.set('€', 'EUR');
  currencies.set('₽', 'RUB');

  return currencies.get(symbol);
}

const parseNumberFromStr = (str) => {
  return parseFloat(str.trim().replace(/[^\d.]/g, ''));
}

const parseAndFormatDate = (str) => {
  const [day, month, year] = str.split('/');
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
}

export {substrBeforeSymbol, convertCurrency, parseNumberFromStr, parseAndFormatDate}
