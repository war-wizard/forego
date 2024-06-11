import { Children, createChildren } from './children';
import { JSX } from './jsx';

export function Fragment(props: { readonly children?: Children } | null): JSX.Element {
  return createChildren(props?.children);
}
