import Vue from './core/index'

new Vue({
    el: '#app',
    data: {
        title: 'hello world',
    },
    methods: {
        clickMe() {
            this.title = 'world change';
        }
    }
});