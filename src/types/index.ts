export interface VueConfig {
    el: any,
    data?: object,
    beforeCreate?: () => void,
    created?: () => void,
    mounted?: () => void,
    methods?: object
}