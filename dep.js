class Dep {
    static target = null

    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}