import { Prop, PropsMap } from './props';
import { Children, appendChildren } from './children';

export namespace JSX {
  export type Element = Node;
  export type IntrinsicElements = PropsMap;
  export interface ElementChildrenAttribute {
    children: unknown;
  }
}

export function jsx<T extends keyof HTMLElementTagNameMap>(type: T, props: PropsMap[T]): HTMLElementTagNameMap[T];
export function jsx<P, N extends Node>(type: (props: P) => N, props: P): N;
export function jsx(type: string | ((props: unknown) => Node), props: unknown): Node {
  if (typeof type == 'string') {
    const { is, children, ...otherProps } = props as { is?: string; children?: Prop<Children>; [key: string]: unknown };

    const node = document.createElement(type, is ? { is } : undefined);

    for (const [name, value] of Object.entries(otherProps)) {
      if (value === false || value === undefined || value === null) continue;

      if (name.startsWith('on')) {
        (node as unknown as { [name: string]: unknown })[name] = value;

      } else if (typeof value == 'function') {
        (value as (set: (value: unknown) => void) => void)((value: unknown) => {
          if (value === false || value === undefined || value === null) {
            node.removeAttribute(name);
          } else {
            node.setAttribute(name, value === true ? '' : String(value));
          }
        });

      } else {
        node.setAttribute(name, value === true ? '' : String(value));
      }
    }

    appendChildren(node, children);

    return node;

  } else {
    return type(props);
  }
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export function createElement(): never {
  throw new Error('createElement not implemented');
}
