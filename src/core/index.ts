import { initState } from './observer'
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

        // 对 data 数据做响应式处理
        initState(this.data);
        new Compile(options.el, this);
        if(options.mounted) options.mounted.call(this);
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
