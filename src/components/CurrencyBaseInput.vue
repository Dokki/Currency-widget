<template>
    <div class="currency-base">
        <select
            class="currency-base__element"
            @change="setCurrency($event.target.value)" 
            :disabled="loading">
            <option disabled value="" selected></option>
            <option v-for="currency in currencyBase" :value="currency" :key="currency">
                {{ currency }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as CONST from '../store/constants';

export default {
    name: 'CurrencyBaseInput',
    computed: {
        ...mapState([
            'currencyBase',
            'loading'
        ])
    },
    methods: {
        ...mapActions({
            setCurrency: CONST.ACTION_CURRENCY_BASE_SELECTED
        })
    }
};
</script>

<style lang="sass">
    .currency-base{
        font-size: inherit;
    }
    .currency-base__element{
        padding: 5px;
        width: 120px;
        font-size: 12px;
        border: 1px solid $element-border-color;
        border-radius: 3px;
    }
</style>
