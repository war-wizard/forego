import { Children, appendChildren } from './children';
import { Prop } from './props';

export function Fragment(props: { readonly children?: Prop<Children> } | null): DocumentFragment {
  const node = new DocumentFragment();
  appendChildren(node, props?.children);
  return node;
}
