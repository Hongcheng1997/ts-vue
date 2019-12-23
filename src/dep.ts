export default class Dep {
    static target: any
    public subs: any = []

    constructor() {
        this.subs = []
    }

    addSub(sub: any) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach((sub: any) => {
            sub.update();
        });
    }
}