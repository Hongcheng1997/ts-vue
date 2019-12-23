import Dep from './dep'

export default class Watcher {
    vm: any
    exp: any
    cb: any
    value: any

    constructor(vm: any, exp: any, cb: any) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.value = this.get();
    }

    update() {
        this.run();
    }

    run() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }

    get() {
        Dep.target = this;
        var value = this.vm.data[this.exp]
        Dep.target = null;
        return value;
    }

}
