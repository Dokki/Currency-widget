import format from 'date-format';
import * as CONST from '../store/constants';

class Request {
    constructor() {
        this.isMock = CONST.IS_MOCK;
    }

    async getRates(store){
        let { currencyDate, currencyBaseSelected } = store.state;

        if (currencyBaseSelected === null)
            return;

        store.commit(CONST.MUTATION_SET_LOADING, true);
  
        let date = format.asString('yyyy-MM-dd', currencyDate),
            base = currencyBaseSelected === CONST.CURRENCY_EURO ? '' : `?base=${currencyBaseSelected}`,
            json = await this.getRatesWrapper(`https://api.ratesapi.io/api/${date}${base}`),
            rates = json.rates,
            items = Object.keys(rates).map(currency => { return {name: currency, value: rates[currency]};});

        store.commit(CONST.MUTATION_SET_CURRENCY_RATES, items.slice(0, 6));
        store.commit(CONST.MUTATION_SET_LOADING, false);
    }

    async getRatesWrapper(url){
        if(this.isMock)
            return this.getMockRates();

        return fetch(url, {mode: 'cors'})
            .then(response => response.json());
    }

    getMockRates(){
        const data = JSON.parse('{"base":"RUB","rates":{"GBP":0.0108411208,"HKD":0.1044866236,"IDR":207.4203094446,"ILS":0.0473447249,"DKK":0.0926681459,"INR":1.026423547,"CHF":0.0131154914,"MXN":0.3357389375,"CZK":0.3377204861,"SGD":0.0191210124,"THB":0.4377545265,"HRK":0.093828501,"EUR":0.0124235023,"MYR":0.0587010483,"NOK":0.1422652517,"CNY":0.0954870386,"BGN":0.0242978858,"PHP":0.6831311201,"PLN":0.0562623148,"ZAR":0.2535748628,"CAD":0.0189520527,"ISK":1.9728521628,"BRL":0.0749485046,"RON":0.0600924806,"NZD":0.0222293726,"TRY":0.0941390886,"JPY":1.4438594355,"RUB":1.0,"KRW":16.5085983059,"USD":0.0134819847,"AUD":0.0208652721,"HUF":4.4050012051,"SEK":0.1351031026},"date":"2020-04-27"}');

        for(let currency in data.rates){
            data.rates[currency] = Math.random();
        }

        return new Promise((resolve) => {
            setTimeout(() => resolve(data), 1200);
        });
    }
}
  
export default new Request;