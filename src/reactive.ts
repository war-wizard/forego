import { ArrayState, ArrayStateCallback } from './array-state';
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
export function reactive<I, O>(state: State<I>, callback: (value: I) => O): PropCallback<O>;
export function reactive<I extends object, O>(deps: Deps<I>, callback: (deps: I) => O): PropCallback<O>;
export function reactive(stateOrDeps: State<unknown> | Deps<object>, callback?: (deps: unknown) => unknown): PropCallback<unknown> {
  if (stateOrDeps instanceof State) {
    if (!callback) {
      return _reactive1(stateOrDeps);
    } else {
      return _reactive2(stateOrDeps, callback);
    }
  } else {
    return _reactive3(stateOrDeps, callback!);
  }
}

function _reactive1<T>(state: State<T>): PropCallback<T> {
  return _reactive3({ state }, ({ state }) => state);
}

function _reactive2<I, O>(state: State<I>, callback: (value: I) => O): PropCallback<O> {
  return _reactive3({ state }, ({ state }) => callback(state));
}

function _reactive3<I extends object, O>(deps: Deps<I>, callback: (deps: I) => O): PropCallback<O> {
  const parentContext = currentContext;
  return (set) => {
    let prevContext = IGNORE_CONTEXT;
    const update = () => {
      prevContext.terminate();
      const context = prevContext = newContext();
      callInContext(context, () => {
        set(callback(Object.fromEntries(Object.entries(deps).map(([k, v]) => [k, (v as State<unknown>).get()])) as I));
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

export function reactiveMap<I, O>(state: ArrayState<I>, callback: (value: I) => O): PropCallback<Iterable<O>>;
export function reactiveMap<I, O>(state: State<Iterable<I>>, callback: (value: I) => O): PropCallback<Iterable<O>>;
export function reactiveMap<I, O>(state: State<Iterable<I>>, callback: (value: I) => O): PropCallback<Iterable<O>> {

  const parentContext = currentContext;

  if (state instanceof ArrayState) {
    return (set) => {
      const childContext: Context[] = [];
      const output: O[] = [];
      const update: ArrayStateCallback = (spliced) => {
        const { start = 0, deleteCount = Infinity, insertCount = Infinity } = spliced ?? {};
        for (const context of childContext.slice(start, start + deleteCount)) context.terminate();
        const insertedContext: Context[] = [];
        const insertedOutput: O[] = [];
        for (const input of state.get().slice(start, start + insertCount)) {
          const context = newContext();
          insertedContext.push(context);
          callInContext(context, () => {
            insertedOutput.push(callback(input));
          });
          const terminateContext = () => context.terminate();
          parentContext.addTerminator(terminateContext);
          context.addTerminator(() => parentContext.removeTerminator(terminateContext));
        }
        childContext.splice(start, deleteCount, ...insertedContext);
        output.splice(start, deleteCount, ...insertedOutput);
        set(output);
      };
      state.addListener(update);
      parentContext.addTerminator(() => state.removeListener(update));
      update();
    };

  } else {
    return reactive(state, value => Array.from(value, callback));
  }
}
