<template>
    <table class="currency-table">
        <tr>
            <th class="currency-table__header currency-table__icon"></th>
            <th class="currency-table__header currency-table__currency">Currency</th>
            <th class="currency-table__header currency-table__value">Value</th>
        </tr>
        <tr v-if="!isHaveRates">
            <td class="currency-table__cell currency-table__cell-empty" colspan="3">Please choose the currency</td>
        </tr>
        <tr v-for="rate in rates" :key="rate.name">
            <td class="currency-table__cell currency-table__icon">
                <component class="currency-table__svg" :is="icon(rate.name)" width='30px' height='20px'></component>
            </td>
            <td class="currency-table__cell currency-table__currency">{{rate.name}}</td>
            <td class="currency-table__cell currency-table__value">{{rate.value}}</td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import gbp from '@assets/gb';
import dkk from '@assets/dk';
import hkd from '@assets/hk';
import idr from '@assets/id';
import ils from '@assets/il';
import inr from '@assets/in';

export default {
    name: 'CurrencyTable',
    components: {
        gbp,
        dkk,
        hkd,
        idr,
        ils,
        inr
    },
    computed: {
        /*
            Is have rates for render.
        */
        isHaveRates(){
            return this.currencyRates.length > 0;
        },
        /*
            Get rates for render.
        */
        rates(){
            if (!this.isHaveRates)
                return [];

            const rates = this.currencyRates,
                filterArr = this.currencyFilterValue;

            return filterArr.length ? rates.filter(rate => filterArr.includes(rate.name)) : rates;
        },
        ...mapState([
            'currencyRates',
            'currencyFilterValue'
        ])
    },
    methods: {
        /*
            Method for generate icon.
        */
        icon(name){
            return name.toLowerCase();
        }
    }
};
</script>

<style lang="scss">
    .currency-table{
        padding: 0;
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 12px;
        width: 435px;
    }
    .currency-table__cell{
        border: $border;
    }
    .currency-table__header{
        border: $border;
        background: $main-color;
        font-weight: normal;
        padding: 5px 0;
    }
    .currency-table__cell-empty{
        text-align: center;
        padding: 5px 0;
    }
    .currency-table__icon{
        width: 40px;
    }
    .currency-table__svg{
        display: block;
        margin: 0 auto;
    }
    .currency-table__currency{
        width: 100px;
    }
    .currency-table__value{
        width: 200px;
    }
</style>
