import { Prop, PropCallback } from './props';

export class State<T> {
  protected _value: T;
  protected readonly _listeners: Set<() => void>;

  constructor(value: T) {
    this._value = value;
    this._listeners = new Set();
  }

  get() {
    return this._value as T;
  }

  set(value: T) {
    this._value = value;
    for (const listener of this._listeners) listener();
  }

  addListener(callback: () => void) {
    this._listeners.add(callback);
  }

  removeListener(callback: () => void) {
    this._listeners.delete(callback);
  }
}

export function state<T>(prop: Prop<T>): State<T>;
export function state<T>(): State<T | undefined>;
export function state<T>(value?: Prop<T>) {
  if (typeof value == 'function') {
    const state = new State<T | undefined>(undefined);
    (value as PropCallback<T>)(value => state.set(value));
    return state;

  } else {
    return new State(value);
  }
}
