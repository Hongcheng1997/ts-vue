
export function isDirective(attr: any) {
  return attr.indexOf('v-') == 0;
}

export function isEventDirective(dir: any) {
  return dir.indexOf('on:') === 0;
}

export function isElementNode(node: any) {
  return node.nodeType == 1;
}

export function isTextNode(node: any) {
  return node.nodeType == 3;
}
