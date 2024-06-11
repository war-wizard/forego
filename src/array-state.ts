import { Prop, PropCallback } from './props';
import { State } from './state';

export type ArrayStateCallback = (spliced?: { start: number; deleteCount: number; insertCount: number }) => void;

export class ArrayState<T> extends State<readonly T[]> {
  declare protected readonly _listeners: Set<ArrayStateCallback>;

  addListener(callback: ArrayStateCallback): void {
    super.addListener(callback);
  }

  splice(start: number, deleteCount: number, ...items: T[]) {
    const { length } = this._value;
    start = Math.max(0, Math.min(start < 0 ? length - start : start, length));
    deleteCount = Math.max(0, Math.min(deleteCount, length - start));
    this._value = this._value.toSpliced(start, deleteCount, ...items);
    const insertCount = items.length;
    for (const listener of this._listeners) listener({ start, deleteCount, insertCount });
  }

  push(item: T) {
    this.splice(Infinity, 0, item);
  }

  pop() {
    this.splice(-1, 1);
  }
}

export function arrayState<T>(prop: Prop<readonly T[]>): ArrayState<T>;
export function arrayState<T>(): ArrayState<T>;
export function arrayState<T>(value: Prop<readonly T[]> = []) {
  if (typeof value == 'function') {
    const state = new ArrayState<T>([]);
    (value as PropCallback<readonly T[]>)(value => state.set(value));
    return state;

  } else {
    return new ArrayState(value);
  }
}
