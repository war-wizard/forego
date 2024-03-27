import { Prop, PropCallback } from './props';

export class State<T> {
  #value?: T;
  readonly #listeners: Set<() => void>;

  constructor(prop: Prop<T>) {
    this.#listeners = new Set();
    if (typeof prop == 'function') {
      (prop as PropCallback<T>)(value => this.set(value));
    } else {
      this.set(prop);
    }
  }

  get() {
    return this.#value as T;
  }

  set(newValue: T) {
    this.#value = newValue;
    for (const listener of this.#listeners) listener();
  }

  addListener(callback: () => void) {
    this.#listeners.add(callback);
  }

  removeListener(callback: () => void) {
    this.#listeners.delete(callback);
  }
}

export type PropOrState<T> = Prop<T> | State<T>;

export function state<T>(propOrState: PropOrState<T>): State<T> {
  if (propOrState instanceof State) {
    return propOrState;
  } else {
    return new State(propOrState);
  }
}
