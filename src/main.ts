import Vue from './core/index'

new Vue({
  el: '#app',
  data: {
    title: 'hello world',
  },
  beforeCreate() { console.log('beforeCreate') },
  created() { console.log('created') },
  mounted() { console.log('mounted') },
  methods: {
    clickMe() {
      this.title = 'world change';
    }
  }
});
