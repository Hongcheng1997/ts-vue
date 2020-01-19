import Dep from './dep'
import { PlainObject } from '../../types/index'

class Observer {
  data: PlainObject;

  constructor(data: PlainObject) {
    this.data = data;
    this.walk(data);
  }

  walk(data: PlainObject) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(data: PlainObject, key: string, val: any) {
    var dep = new Dep();
    var childObj = initState(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        if (Dep.target) {
          dep.depend()
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
}

export function initState(value: PlainObject) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
};
