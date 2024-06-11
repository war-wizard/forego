export type PropSetter<T> = (value: T) => void;
export type PropCallback<T> = (set: PropSetter<T>) => void;
export type Prop<T> = T | PropCallback<T>;

export function handleProp<T>(prop: Prop<T>, callback: PropSetter<T>) {
  if (typeof prop == 'function') {
    (prop as PropCallback<T>)(callback);
  } else {
    callback(prop);
  }
}

type Props<P extends object> = { [K in keyof P]: Prop<P[K]> };

export function handleProps<P extends object>(props: Props<P>, callback: (values: P) => void) {
  const values: Record<string, unknown> = {};
  let initialized = false;
  for (const [name, prop] of Object.entries(props)) {
    handleProp(prop, (value) => {
      values[name] = value;
      if (initialized) callback(values as P);
    });
  }
  initialized = true;
  callback(values as P);
}
