import Watcher from '../core/observer/watcher'
import { isEventDirective, isDirective, isElementNode, isTextNode } from '../core/util/index'

export default class Compile {
  vm: any;
  el: any;
  fragment: object;

  constructor(el: any, vm: any) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
  }

  init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  }

  nodeToFragment(el: any) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  }

  compileElement(el: any) {
    var childNodes = el.childNodes;
    [].slice.call(childNodes).forEach((node: any) => {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (isElementNode(node)) {
        this.compile(node);
      }

      if (isTextNode(node) && reg.test(text)) {
        this.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node);
      }
    });
  }

  compile(node: any) {
    var nodeAttrs = node.attributes;
    Array.prototype.forEach.call(nodeAttrs, (attr: any) => {
      var attrName = attr.name;
      if (isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (isEventDirective(dir)) {  // 事件指令
          this.compileEvent(node, this.vm, exp, dir);
        } else {  // v-model 指令
          this.compileModel(node, this.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    });
  }

  compileText(node: any, exp: any) {
    var initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, (value: any) => {
      this.updateText(node, value);
    });
  }

  compileEvent(node: any, vm: any, exp: any, dir: string) {
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  }

  compileModel(node: any, vm: any, exp: any, dir: string) {
    var val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, (value: any) => {
      this.modelUpdater(node, value);
    });

    node.addEventListener('input', (e: any) => {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      this.vm[exp] = newValue;
      val = newValue;
    });
  }

  updateText(node: any, value: any) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  }

  modelUpdater(node: any, value: any) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
}
