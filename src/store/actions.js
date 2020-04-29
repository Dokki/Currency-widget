import * as CONST from './constants';
import request from '../api';

export default {
    [CONST.ACTION_CURRENCY_BASE_SELECTED](store, value) {
        store.commit(CONST.MUTATION_SET_CURRENCY, value);

        request.getRates(store);
    },
    [CONST.ACTION_UPDATE_CURRENCY_DATE](store, value) {
        store.commit(CONST.MUTATION_UPDATE_CURRENCY_DATE, value);
        
        request.getRates(store);
    }
};
