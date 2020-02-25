import { initState } from './observer/index'
import Compile from '../compiler/compile'
import { strat, callHook } from './lifecycle/index'
import { VueConfig } from '../types/index'


export default class Vue {
  static $options = Object.create(null)
  data = Object.create(null)
  methods = Object.create(null)
  vm: Vue = this

  constructor(options: VueConfig) {
    this.data = options.data;
    this.methods = options.methods;

    // 合并 options，没有组件暂时做 $options 挂载
    Vue.$options = this.mergeOptions(options)

    Object.keys(this.data).forEach((key) => {
      this.proxyKeys(key);
    });

    callHook('beforeCreate')
    initState(this.data);
    callHook('created')
    new Compile(options.el, this);
    callHook('mounted')
  }

  proxyKeys(key: string) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get() {
        return this.data[key];
      },
      set(newVal) {
        this.data[key] = newVal;
      }
    });
  }

  mergeOptions(child: VueConfig) {
    let options = Object.create(null)
    for (let key in child) {
      if (strat.some(hook => (hook === key))) {
        options[key] = [child[key]]
      }
    }
    return options
  }
}
