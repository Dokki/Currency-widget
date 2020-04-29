import * as CONST from './constants';

export default {
    loading: false,

    currencyBase: [
        CONST.CURRENCY_USD,
        CONST.CURRENCY_EURO,
        CONST.CURRENCY_RUB,
        CONST.CURRENCY_CNY,
        CONST.CURRENCY_JPY
    ],
    currencyBaseSelected: null,
    currencyFilterValue: [],
    currencyDate: new Date(),

    currencyRates: []
};
