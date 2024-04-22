import { PropCallback } from './props';
import { State } from './state';

type Deps<D extends object> = { [K in keyof D]: State<D[K]> };

interface Context {
  readonly addTerminator: (callback: () => void) => void;
  readonly removeTerminator: (callback: () => void) => void;
  readonly terminate: () => void;
}

const IGNORE_CONTEXT: Context = {
  addTerminator() {},
  removeTerminator() {},
  terminate() {},
};

function newContext(): Context {
  let terminated = false;
  const terminators = new Set<() => void>();

  return {
    addTerminator(callback) {
      if (terminated) {
        callback();
      } else {
        terminators.add(callback);
      }
    },

    removeTerminator(callback) {
      if (terminated) return;
      terminators.delete(callback);
    },

    terminate() {
      if (terminated) return;
      terminated = true;
      for (const callback of terminators) callback();
      terminators.clear();
    },
  };
}

let currentContext = IGNORE_CONTEXT;

function callInContext(context: Context, callback: () => void) {
  const oldContext = currentContext;
  currentContext = context;
  callback();
  currentContext = oldContext;
}

export function reactive<T>(state: State<T>): PropCallback<T>;
export function reactive<D extends object, T>(deps: Deps<D>, callback: (deps: D) => T): PropCallback<T>;
export function reactive<D extends object, T>(stateOrDeps: State<T> | Deps<D>, callback?: (deps: D) => T): PropCallback<T> {
  if (!callback) {
    const state = stateOrDeps as State<T>;
    return reactive({ state }, ({ state }) => state);

  } else {
    const deps = stateOrDeps as Deps<D>;
    const parentContext = currentContext;
    return (set: (value: T) => void) => {
      let prevContext = IGNORE_CONTEXT;
      const update = () => {
        prevContext.terminate();
        const context = prevContext = newContext();
        callInContext(context, () => {
          set(callback(Object.fromEntries(Object.entries(deps).map(([k, v]) => [k, (v as State<unknown>).get()])) as D));
        });
        const terminateContext = () => context.terminate();
        parentContext.addTerminator(terminateContext);
        context.addTerminator(() => parentContext.removeTerminator(terminateContext));
      };
      Object.values(deps).forEach(dep => (dep as State<unknown>).addListener(update));
      parentContext.addTerminator(() => Object.values(deps).forEach(dep => (dep as State<unknown>).removeListener(update)));
      update();
    };
  }
}
