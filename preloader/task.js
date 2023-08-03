const request = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const items = document.getElementById('items');
const loader = document.getElementById('loader');

function createDiv(code, val) {
  const newItemHTML = `
    <div class="item">
      <div class="item__code">
        ${code}
      </div>
      <div class="item__value">
        ${val}
      </div>
      <div class="item__currency">
        руб.
      </div>
    </div>
  `;
  items.insertAdjacentHTML('beforeend', newItemHTML);
}

function displayCurrencyData(valuteObj) {
  for (const currencyCode in valuteObj) {
    const currency = valuteObj[currencyCode];
    const charCode = currency.CharCode;
    const value = currency.Value;
    createDiv(charCode, value);
  }
}

request.addEventListener('readystatechange', () => {
  if (request.readyState === request.DONE) {
    const jsonDict = JSON.parse(request.responseText);
    loader.classList.remove('loader_active');

    const valuteObj = jsonDict.response.Valute;
    displayCurrencyData(valuteObj);

    localStorage.setItem('currency_data', JSON.stringify(jsonDict));
  }
});

const cachedData = localStorage.getItem('currency_data');
if (cachedData) {
  const jsonDict = JSON.parse(cachedData);
  const valuteObj = jsonDict.response.Valute;
  displayCurrencyData(valuteObj);
} else {
  request.open('GET', url);
  request.send();
}
