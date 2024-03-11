import { PropsMap } from './props';
import { Children, appendChildren } from './children';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type Element = Node;
  export type IntrinsicElements = PropsMap;
  export interface ElementChildrenAttribute { children: unknown; }
}

export function jsx<T extends keyof HTMLElementTagNameMap>(type: T, props: PropsMap[T]): HTMLElementTagNameMap[T];
export function jsx<P, N extends Node>(type: (props: P) => N, props: P): N;
export function jsx(type: string | ((props: unknown) => Node), props: unknown): Node {
  if (typeof type == 'string') {
    const { is, children, data, ...otherProps } = props as PropsMap[keyof PropsMap];

    const node = document.createElement(type, is ? { is } : undefined);

    for (const [name, value] of Object.entries(otherProps)) {
      if (value === false || value === undefined || value === null) continue;

      if (name.startsWith('on')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node as any)[name] = value;

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

    if (data) {
      for (const [name, value] of Object.entries(data as object)) {
        node.dataset[name] = value;
      }
    }

    appendChildren(node, children as Children);

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
