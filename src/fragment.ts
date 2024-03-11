import { Children, appendChildren } from './children';

export function Fragment(props: { readonly children?: Children } | null): DocumentFragment {
  const node = new DocumentFragment();
  appendChildren(node, props?.children);
  return node;
}
