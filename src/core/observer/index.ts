import Dep from './dep'

class Observer {
  data: object;

  constructor(data: object) {
    this.data = data;
    this.walk(data);
  }

  walk(data: object) {
    Object.keys(data).forEach((key: keyof typeof data) => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(data: object, key: string, val: any) {
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

export function initState(value: object) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
};
