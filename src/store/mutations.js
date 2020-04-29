import * as CONST from './constants';

export default {
    [CONST.MUTATION_SET_CURRENCY](state, currency) {
        state.currencyBaseSelected = currency;
    },
    [CONST.MUTATION_UPDATE_CURRENCY_FILTER](state, value) {
        state.currencyFilterValue = value;
    },
    [CONST.MUTATION_UPDATE_CURRENCY_DATE](state, value) {
        state.currencyDate = value;
    },
    [CONST.MUTATION_SET_LOADING](state, loading) {
        state.loading = loading;
    },
    [CONST.MUTATION_SET_CURRENCY_RATES](state, item) {
        state.currencyRates = item;
    }
};
