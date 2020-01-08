import { observe } from './observer'
import Compile from './compile'

export default class Vue {
    data: any;
    methods: object

    constructor(options: any) {
        this.data = options.data;
        this.methods = options.methods;

        Object.keys(this.data).forEach((key) => {
            this.proxyKeys(key);
        });

        observe(this.data);
        new Compile(options.el, this);
        options.mounted.call(this);
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
}
