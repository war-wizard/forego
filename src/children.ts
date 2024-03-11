import type { Prop } from './props';

export type Children = Node | string | number | bigint | false | null | undefined | Iterable<Children>;

export function appendChildren(node: ParentNode, children: Prop<Children>) {
  if (typeof children == 'function') {
    const start = new Text();
    const end = new Text();
    node.append(start, end);

    children((children) => {
      const fragment = new DocumentFragment();
      _appendChildren(fragment, children);
      const range = new Range();
      range.setStartAfter(start);
      range.setEndBefore(end);
      range.deleteContents();
      range.insertNode(fragment);
    });

  } else {
    _appendChildren(node, children);
  }
}

function _appendChildren(node: ParentNode, children: Children) {
  if (children === undefined) return;
  if (children === null) return;
  if (children === false) return;

  if (children instanceof Node) {
    node.append(children);

  } else if (typeof children == 'object') {
    for (const child of children) {
      appendChildren(node, child);
    }

  } else {
    node.append(String(children));
  }
}
