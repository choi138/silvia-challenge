import path from 'node:path';
import { fileURLToPath } from 'node:url';

import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import reactNative from 'eslint-plugin-react-native';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/.DS_Store', '**/dist'],
  },
  ...compat.extends('prettier', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      prettier,
      import: fixupPluginRules(_import),
      'react-native': reactNative,
      react,
      'jsx-a11y': jsxA11Y,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],

      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      'no-unused-vars': 'off',
      'react/jsx-key': 'error',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      'import/no-unresolved': 'error',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '{react*,react*/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{react-native*,react-native*/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{expo*,expo*/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: './**, @/**',
              group: 'internal',
              position: 'after',
            },
          ],

          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],

          pathGroupsExcludedImportTypes: ['react', 'react-native'],
          'newlines-between': 'always',
        },
      ],

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.tsx'],
        },
      ],
    },
  },
  ...compat.extends('plugin:@typescript-eslint/recommended').map((config) => ({
    ...config,
    files: ['**/*.ts?(x)'],
  })),
  {
    files: ['**/*.ts?(x)'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          variables: false,
        },
      ],

      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
];
