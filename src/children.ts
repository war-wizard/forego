import { JSX, appendJSX } from './jsx';
import { Prop, PropCallback } from './props';

type Child = Text | Comment | Element | string | number | bigint | false | null | undefined;
export type Children = Prop<Child | Iterable<Children>>;

class DynamicChildren implements Iterable<JSX.Element> {
  readonly #start = new Text();
  readonly #end = new Text();

  constructor(children: PropCallback<Child | Iterable<Children>>) {
    const fragment = new DocumentFragment();
    fragment.append(this.#start, this.#end);

    children((children) => {
      const fragment = new DocumentFragment();
      appendJSX(fragment, createChildren(children));
      const range = new Range();
      range.setStartAfter(this.#start);
      range.setEndBefore(this.#end);
      range.deleteContents();
      range.insertNode(fragment);
    });
  }

  *[Symbol.iterator]() {
    yield this.#start;
    let node = this.#start.nextSibling;
    while (node && node !== this.#end) {
      yield node as JSX.Element;
      node = node.nextSibling;
    }
    yield this.#end;
  }
}

export function createChildren(children: Children): JSX.Element {
  if (typeof children == 'function') {
    return new DynamicChildren(children);

  } else {
    if (children === undefined) return [];
    if (children === null) return [];
    if (children === false) return [];

    if (children instanceof Node) {
      return children;

    } else if (typeof children == 'object') {
      return [...children].map(createChildren);

    } else {
      return new Text(String(children));
    }
  }
}
