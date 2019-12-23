import { observe } from './observer'
import Compile from './compile'

export default function Vue(options) {
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach((key) => {
        this.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this);
}

Vue.prototype.proxyKeys = function (key) {
    var self = this;
    Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get: function proxyGetter() {
            return self.data[key];
        },
        set: function proxySetter(newVal) {
            self.data[key] = newVal;
        }
    });
}
