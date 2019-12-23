import Vue from './index'

new Vue({
    el: '#app',
    data: {
        title: 'hello world',
        name: 'canfoo'
    },
    methods: {
        clickMe() {
            this.title = 'hello world';
        }
    },
    mounted() {
        window.setTimeout(() => {
            this.title = '你好';
        }, 1000);
    }
});