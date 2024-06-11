import { Prop } from './props';

export interface GlobalProps extends DataProps, MicrodataProps, ARIAProps {
  readonly accesskey?: Prop<string>;
  readonly autocapitalize?: Prop<'characters' | 'none' | 'off' | 'on' | 'sentences' | 'words'>;
  readonly autofocus?: Prop<boolean>;
  readonly class?: Prop<string>;
  readonly contenteditable?: Prop<boolean | 'true' | 'false' | 'plaintext-only'>;
  readonly dir?: Prop<'ltr' | 'rtl' | 'auto'>;
  readonly draggable?: Prop<'true' | 'false'>;
  readonly enterkeyhint?: Prop<string>;
  readonly exportparts?: Prop<string>;
  readonly hidden?: Prop<boolean | 'hidden' | 'until-found'>;
  readonly id?: Prop<string>;
  readonly inert?: Prop<boolean>;
  readonly inputmode?: Prop<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'>;
  readonly is?: string;
  readonly lang?: Prop<string>;
  readonly nonce?: Prop<string>;
  readonly part?: Prop<string>;
  readonly popover?: Prop<boolean | 'auto' | 'manual'>;
  readonly slot?: Prop<string>;
  readonly spellcheck?: Prop<'true' | 'false'>;
  readonly style?: Prop<string>;
  readonly tabindex?: Prop<`${number}` | number | bigint>;
  readonly title?: Prop<string>;
  readonly translate?: Prop<'yes' | 'no'>;
}

interface DataProps {
  readonly [key: `data-${string}`]: Prop<string>;
}

interface MicrodataProps {
  readonly itemid?: Prop<string>;
  readonly itemprop?: Prop<string>;
  readonly itemref?: Prop<string>;
  readonly itemscope?: Prop<boolean>;
  readonly itemtype?: Prop<string>;
}

interface ARIAProps {
  // TODO this is just temporary
  readonly role?: Prop<string>;
  readonly [key: `aria-${string}`]: Prop<string>;
}
