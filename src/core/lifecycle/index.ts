import Vue from '../index'

export const strat: Array<string> = ['beforeCreate', 'created', 'mounted']

export function callHook(hook: string) {
    const handlers = Vue.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            handlers[i]()
        }
    }
}