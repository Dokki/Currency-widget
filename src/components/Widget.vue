<template>
    <div class="currency">
        <div class="currency__header">Exchange Rates Widget</div>
        <div class="currency__content">
            <h3 class="currency__title">Exchange Rates{{mocks}}</h3>
            <div class="currency__elements">
                <div class="currency__element">
                    <label class="currency__label">Base</label>
                    <CurrencyBaseInput />
                </div>
                <div class="currency__element currency__element-multiselect">
                    <label class="currency__label">Filter</label>
                    <multiselect 
                        :value="currencyFilterValue" 
                        :options="options"
                        @input="updateCurrencyFilter"
                        :multiple="true" 
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        :disabled="isDisabled"
                        :searchable="false"
                        placeholder="All"
                        >
                        <template v-slot:selection="{ values }">
                            <span class="multiselect__single" v-if="values.length">{{ values.length }} items selected</span>
                        </template>
                    </multiselect>
                </div>
                <div class="currency__element currency__element-loader">
                    <loader v-if="loading" width='30px' height='28px' />
                </div>                
            </div>
            <div class="currency__elements">
                <div class="currency__element">
                    <CurrencyTable />
                </div>
                <div class="currency__element currency__element-datepicker">
                    <datepicker 
                        :inline="true"
                        :value="currencyDate"
                        :disabled-dates="disabledDaysFromToday"
                        :disabled="isDisabled"
                        @selected="updateCurrencyDate"
                        />
                </div>
            </div>
        </div>
        <div class="currency__footer">© Copyright, 2020</div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import * as CONST from '../store/constants';
import CurrencyBaseInput from './CurrencyBaseInput';
import CurrencyTable from './CurrencyTable';
import Multiselect from 'vue-multiselect';
import Datepicker from 'vuejs-datepicker';
import loader from '@assets/loader';

export default {
    name: 'Widget',
    computed: {
        mocks(){
            return CONST.IS_MOCK ? ': working with mocks.' : '';
        },
        /*
            Is need disable the inputs/selects.
        */
        isDisabled() {
            return this.loading || this.currencyBaseSelected === null || this.currencyRates.length === 0;
        },
        /*
            Disable future days in calendar.
        */
        disabledDaysFromToday(){
            return {from: new Date()};
        },
        /*
            Get the rates for filter.
        */
        options(){
            return this.currencyRates.map(rate => rate.name);
        },
        ...mapState([
            'loading',
            'currencyBaseSelected',
            'currencyFilterValue', 
            'currencyRates', 
            'currencyDate'
        ])
    },
    methods: {
        ...mapMutations({
            updateCurrencyFilter: CONST.MUTATION_UPDATE_CURRENCY_FILTER
        }),
        ...mapActions({
            updateCurrencyDate: CONST.ACTION_UPDATE_CURRENCY_DATE
        })
    },
    components: {
        CurrencyBaseInput,
        CurrencyTable,
        Multiselect,
        Datepicker,
        loader
    }
};
</script>

<style lang="scss">
    .currency {
        margin: 30px auto 0 auto;
        width: 730px;
        border: $border;
    }
    .currency__header{
        background-color: $main-color;
        padding: 15px 25px;
    }
    .currency__content{
        padding: 15px 25px;
    }
    .currency__title{
        margin-bottom: 10px;
    }
    .currency__footer{
        background-color: $main-color;
        padding: 10px 25px;
    }
    .currency__elements{
        min-height: 80px;
        display: flex;
    }
    .currency__element{
        align-self: left;
    }
    .currency__element-multiselect{
        margin-left: 14px;
    }
    .currency__element-loader{
        margin-left: 10px;
        margin-top: 30px;
    }
    .currency__element-datepicker{
        margin-left: 15px;
    }
    .currency__label{
        display: block;
        line-height: 30px;
    }
</style>
