import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config({
  files: ['src/**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    stylistic.configs.customize({
      semi: true,
      braceStyle: '1tbs',
      quoteProps: 'as-needed',
    }),
  ],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@stylistic/padded-blocks': 'off',
  },
});
