import './styles/style.scss';
import Vue from 'vue';
import Widget from './components/Widget';
import store from './store';

new Vue({
    store,
    render: h => h(Widget)
})
    .$mount('#widget');
