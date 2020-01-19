import { initState } from './observer/index'
import Compile from '../compiler/compile'
import { VueConfig } from '../types/index'

export default class Vue {
    data: object;
    methods: object

    constructor(options: VueConfig) {
        this.data = options.data;
        this.methods = options.methods;

        Object.keys(this.data).forEach((key) => {
            this.proxyKeys(key);
        });
        if (options.beforeCreate) options.beforeCreate.call(this);
        initState(this.data);
        if (options.created) options.created.call(this);
        new Compile(options.el, this);
        if (options.mounted) options.mounted.call(this);
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
