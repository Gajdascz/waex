import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';
import prettierConfig from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';

export default tseslint.config(
  {    
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/.vscode/**',
      '.gitignore',
      '**/*.md',
      '**/*LICENSE',
    ]
  },
  eslint.configs.recommended,
  {
    name: 'eslint/shared',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    plugins: {jsdoc}
  },
  {
    name: 'eslint.config/ts',
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      jsdoc.configs['flat/recommended-typescript']
    ],
  },
  {
    name: 'eslint.config/js',
    files: ['**/*.js'],
    extends: [jsdoc.configs['flat/recommended-typescript-flavor']]
  },
  ...fixupConfigRules(prettierConfig)
);



