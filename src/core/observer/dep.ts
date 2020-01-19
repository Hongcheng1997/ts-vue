import Watcher from './watcher'

let uid = 0

export default class Dep {
    static target: any
    public id: number
    private subs: Watcher[] = []

    constructor() {
        this.id = uid++
        this.subs = []
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    addSub(sub: Watcher) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach((sub: Watcher) => {
            sub.update();
        });
    }
}