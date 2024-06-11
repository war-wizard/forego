import { Children } from './children';
import { GlobalProps } from './global-props';
import { Prop } from './props';

type VoidElements = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'param' | 'source' | 'track' | 'wbr';

export type PropsMap = {
  [K in keyof HTMLElementTagNameMap]: GlobalProps & EventHandlers<HTMLElementTagNameMap[K]>;
} & {
  [K in keyof HTMLElementTagNameMap as K extends VoidElements ? never : K]: {
    readonly children?: Prop<Children>;
  }
} & {

  a: {
    readonly download?: Prop<boolean | string>;
    readonly href?: Prop<string>;
    readonly hreflang?: Prop<string>;
    readonly ping?: Prop<string>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly rel?: Prop<string>;
    readonly target?: Prop<LinkTarget>;
    readonly type?: Prop<string>;
  };

  area: {
    readonly alt?: Prop<string>;
    readonly coords?: Prop<string>;
    readonly download?: Prop<boolean | string>;
    readonly href?: Prop<string>;
    readonly hreflang?: Prop<string>;
    readonly ping?: Prop<string>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly rel?: Prop<string>;
    readonly shape?: Prop<'rect' | 'circle' | 'poly' | 'default'>;
    readonly target?: Prop<LinkTarget>;
  };

  audio: {
    readonly autoplay?: Prop<boolean>;
    readonly controls?: Prop<boolean>;
    readonly crossorigin?: Prop<CrossOrigin>;
    readonly loop?: Prop<boolean>;
    readonly muted?: Prop<boolean>;
    readonly preload?: Prop<'none' | 'metadata' | 'auto'>;
    readonly src?: Prop<string>;
  };

  base: {
    readonly href?: Prop<string>;
    readonly target?: Prop<LinkTarget>;
  };

  blockquote: {
    readonly cite?: Prop<string>;
  };

  button: {
    readonly disabled?: Prop<boolean>;
    readonly form?: Prop<string>;
    readonly formaction?: Prop<string>;
    readonly formenctype?: Prop<FormEncoding>;
    readonly formmethod?: Prop<FormMethod>;
    readonly formnovalidate?: Prop<boolean>;
    readonly formtarget?: Prop<LinkTarget>;
    readonly name?: Prop<string>;
    readonly popovertarget?: Prop<string>;
    readonly popovertargetaction?: Prop<'hide' | 'show' | 'toggle'>;
    readonly type?: Prop<'submit' | 'reset' | 'button'>;
    readonly value?: Prop<string | number | bigint>;
  };

  canvas: {
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  col: {
    readonly span?: Prop<`${number}` | number | bigint>;
  };

  colgroup: {
    readonly span?: Prop<`${number}` | number | bigint>;
  };

  data: {
    readonly value?: Prop<string | number | bigint>;
  };

  del: {
    readonly cite?: Prop<string>;
    readonly datetime?: Prop<string>;
  };

  details: {
    readonly open?: Prop<boolean>;
  };

  dialog: {
    readonly open?: Prop<boolean>;
  };

  embed: {
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly src?: Prop<string>;
    readonly type?: Prop<string>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  fieldset: {
    readonly disabled?: Prop<boolean>;
    readonly form?: Prop<string>;
    readonly name?: Prop<string>;
  };

  form: {
    readonly 'accept-charset'?: Prop<string>;
    readonly action?: Prop<string>;
    readonly autocomplete?: Prop<'off' | 'on'>;
    readonly enctype?: Prop<FormEncoding>;
    readonly method?: Prop<FormMethod>;
    readonly name?: Prop<string>;
    readonly novalidate?: Prop<boolean>;
    readonly rel?: Prop<string>;
    readonly target?: Prop<LinkTarget>;
  };

  iframe: {
    readonly allow?: Prop<string>;
    readonly allowfullscreen?: Prop<boolean>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly loading?: Prop<'eager' | 'lazy'>;
    readonly name?: Prop<string>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly sandbox?: Prop<boolean | string>;
    readonly src?: Prop<string>;
    readonly srcdoc?: Prop<string>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  img: {
    readonly alt?: Prop<string>;
    readonly crossorigin?: Prop<CrossOrigin>;
    readonly decoding?: Prop<'sync' | 'async' | 'auto'>;
    readonly elementtiming?: Prop<string>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly ismap?: Prop<boolean>;
    readonly loading?: Prop<'eager' | 'lazy'>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly sizes?: Prop<string>;
    readonly src?: Prop<string>;
    readonly srcset?: Prop<string>;
    readonly width?: Prop<`${number}` | number | bigint>;
    readonly usemap?: Prop<string>;
  };

  input: {
    readonly accept?: Prop<string>;
    readonly alt?: Prop<string>;
    readonly autocomplete?: Prop<string>;
    readonly capture?: Prop<boolean | 'user' | 'environment'>;
    readonly checked?: Prop<boolean>;
    readonly dirname?: Prop<string>;
    readonly disabled?: Prop<boolean>;
    readonly form?: Prop<string>;
    readonly formaction?: Prop<string>;
    readonly formenctype?: Prop<FormEncoding>;
    readonly formmethod?: Prop<FormMethod>;
    readonly formnovalidate?: Prop<boolean>;
    readonly formtarget?: Prop<LinkTarget>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly list?: Prop<string>;
    readonly max?: Prop<string | number | bigint>;
    readonly maxlength?: Prop<`${number}` | number | bigint>;
    readonly min?: Prop<string | number | bigint>;
    readonly minlength?: Prop<`${number}` | number | bigint>;
    readonly multiple?: Prop<boolean>;
    readonly name?: Prop<string>;
    readonly pattern?: Prop<string>;
    readonly placeholder?: Prop<string>;
    readonly popovertarget?: Prop<string>;
    readonly popovertargetaction?: Prop<'hide' | 'show' | 'toggle'>;
    readonly readonly?: Prop<boolean>;
    readonly required?: Prop<boolean>;
    readonly size?: Prop<`${number}` | number | bigint>;
    readonly src?: Prop<string>;
    readonly step?: Prop<string | number | bigint>;
    readonly type?: Prop<InputType>;
    readonly value?: Prop<string | number | bigint>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  ins: {
    readonly cite?: Prop<string>;
    readonly datetime?: Prop<string>;
  };

  label: {
    readonly for?: Prop<string>;
  };

  li: {
    readonly value: Prop<`${number}` | number | bigint>;
  };

  link: {
    readonly as?: Prop<'audio' | 'document' | 'embed' | 'fetch' | 'font' | 'image' | 'object' | 'script' | 'style' | 'track' | 'video' | 'worker'>;
    readonly crossorigin?: Prop<CrossOrigin>;
    readonly href?: Prop<string>;
    readonly hreflang?: Prop<string>;
    readonly imagesizes?: Prop<string>;
    readonly imagesrcset?: Prop<string>;
    readonly integrity?: Prop<string>;
    readonly media?: Prop<string>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly rel?: Prop<string>;
    readonly type?: Prop<string>;
  };

  map: {
    readonly name?: Prop<string>;
  };

  meta: {
    readonly charset?: Prop<string>;
    readonly content?: Prop<string>;
    readonly 'http-equiv'?: Prop<string>;
    readonly name?: Prop<string>;
  };

  meter: {
    readonly value?: Prop<`${number}` | number | bigint>;
    readonly min?: Prop<`${number}` | number | bigint>;
    readonly max?: Prop<`${number}` | number | bigint>;
    readonly low?: Prop<`${number}` | number | bigint>;
    readonly high?: Prop<`${number}` | number | bigint>;
    readonly optimum?: Prop<`${number}` | number | bigint>;
    readonly form?: Prop<string>;
  };

  object: {
    readonly data?: Prop<string>;
    readonly form?: Prop<string>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly name?: Prop<string>;
    readonly type?: Prop<string>;
    readonly usemap?: Prop<string>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  ol: {
    readonly reversed?: Prop<boolean>;
    readonly start?: Prop<`${number}` | number | bigint>;
    readonly type?: Prop<'a' | 'A' | 'i' | 'I' | '1'>;
  };

  optgroup: {
    readonly disabled?: Prop<boolean>;
    readonly label?: Prop<string>;
  };

  option: {
    readonly disabled?: Prop<boolean>;
    readonly label?: Prop<string>;
    readonly selected?: Prop<boolean>;
    readonly value?: Prop<string | number | bigint>;
  };

  output: {
    readonly for?: Prop<string>;
    readonly form?: Prop<string>;
    readonly name?: Prop<string>;
  };

  progress: {
    readonly value?: Prop<`${number}` | number | bigint>;
    readonly max?: Prop<`${number}` | number | bigint>;
  };

  q: {
    readonly cite?: Prop<string>;
  };

  script: {
    readonly async?: Prop<boolean>;
    readonly crossorigin?: Prop<CrossOrigin>;
    readonly defer?: Prop<boolean>;
    readonly integrity?: Prop<string>;
    readonly nomodule?: Prop<boolean>;
    readonly referrerpolicy?: Prop<ReferrerPolicy>;
    readonly src?: Prop<string>;
    readonly type?: Prop<string>;
  };

  select: {
    readonly autocomplete?: Prop<string>;
    readonly disabled?: Prop<boolean>;
    readonly form?: Prop<string>;
    readonly multiple?: Prop<boolean>;
    readonly name?: Prop<string>;
    readonly required?: Prop<boolean>;
    readonly size?: Prop<`${number}` | number | bigint>;
  };

  slot: {
    readonly name?: Prop<string>;
  };

  source: {
    readonly type?: Prop<string>;
    readonly src?: Prop<string>;
    readonly srcset?: Prop<string>;
    readonly sizes?: Prop<string>;
    readonly media?: Prop<string>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };

  style: {
    readonly media?: Prop<string>;
  };

  td: {
    readonly colspan?: Prop<`${number}` | number | bigint>;
    readonly headers?: Prop<string>;
    readonly rowspan?: Prop<`${number}` | number | bigint>;
  };

  textarea: {
    readonly autocomplete?: Prop<string>;
    readonly cols?: Prop<`${number}` | number | bigint>;
    readonly dirname?: Prop<string>;
    readonly disabled?: Prop<boolean>;
    readonly form?: Prop<string>;
    readonly maxlength?: Prop<`${number}` | number | bigint>;
    readonly minlength?: Prop<`${number}` | number | bigint>;
    readonly name?: Prop<string>;
    readonly pattern?: Prop<string>;
    readonly placeholder?: Prop<string>;
    readonly readonly?: Prop<boolean>;
    readonly required?: Prop<boolean>;
    readonly rows?: Prop<`${number}` | number | bigint>;
    readonly wrap?: Prop<'hard' | 'soft'>;
  };

  th: {
    readonly abbr?: Prop<string>;
    readonly colspan?: Prop<`${number}` | number | bigint>;
    readonly headers?: Prop<string>;
    readonly rowspan?: Prop<`${number}` | number | bigint>;
    readonly scope?: Prop<'row' | 'col' | 'rowgroup' | 'colgroup'>;
  };

  time: {
    readonly datetime?: Prop<string>;
  };

  track: {
    readonly default?: Prop<boolean>;
    readonly kind?: Prop<'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'>;
    readonly label?: Prop<string>;
    readonly src?: Prop<string>;
    readonly srclang?: Prop<string>;
  };

  video: {
    readonly autoplay?: Prop<boolean>;
    readonly controls?: Prop<boolean>;
    readonly crossorigin?: Prop<CrossOrigin>;
    readonly height?: Prop<`${number}` | number | bigint>;
    readonly loop?: Prop<boolean>;
    readonly muted?: Prop<boolean>;
    readonly playsinline?: Prop<boolean>;
    readonly poster?: Prop<string>;
    readonly preload?: Prop<'none' | 'metadata' | 'auto'>;
    readonly src?: Prop<string>;
    readonly width?: Prop<`${number}` | number | bigint>;
  };
};

type EventHandler<Target, Handler> =
  Handler extends (this: infer This, event: infer Event, ...rest: infer Rest) => infer Return
    ? (this: This & Target, event: Event & { readonly currentTarget: Target }, ...rest: Rest) => Return
    : Handler;

type EventHandlers<T> = {
  readonly [K in keyof T as K extends `on${string}` ? K : never]?: EventHandler<T, NonNullable<T[K]>>;
};

type ReferrerPolicy =
  'no-referrer' |
  'no-referrer-when-downgrade' |
  'origin' |
  'origin-when-cross-origin' |
  'same-origin' |
  'strict-origin' |
  'strict-origin-when-cross-origin' |
  'unsafe-url';

type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

type CrossOrigin = 'anonymous' | 'use-credentials';

type FormEncoding =
  'application/x-www-form-urlencoded' |
  'multipart/form-data' |
  'text/plain';

type FormMethod = 'post' | 'get' | 'dialog';

type InputType =
  'button' |
  'checkbox' |
  'color' |
  'date' |
  'datetime-local' |
  'email' |
  'file' |
  'hidden' |
  'image' |
  'month' |
  'number' |
  'password' |
  'radio' |
  'range' |
  'reset' |
  'search' |
  'submit' |
  'tel' |
  'text' |
  'time' |
  'url' |
  'week';
