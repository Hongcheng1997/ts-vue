import Vue from './index'

new Vue({
    el: '#app',
    data: {
        title: 'hello world',
        name: 'canfoo'
    },
    methods: {
        clickMe: function () {
            this.title = 'hello world';
        }
    },
    mounted: function () {
        window.setTimeout(() => {
            this.title = '你好';
        }, 1000);
    }
});