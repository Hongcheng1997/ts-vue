import Dep from './dep'
import Vue from '../index'

export default class Watcher {
  vm: Vue
  exp: string
  cb: (value: any) => void
  value: any
  deps: Array<Dep>
  depIds: Set<number>
  newDeps: Array<Dep>
  newDepIds: Set<number>

  constructor(vm: Vue, exp: string, cb: (value: any) => void) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.value = this.get();
  }

  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
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
