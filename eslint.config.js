import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'
import react from 'eslint-plugin-react'
import eslintPluginImport from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      react: react,
      import: eslintPluginImport,
    },
    rules: {
      //Reactフックの推奨ルールを追加
      ...reactHooks.configs.recommended.rules,

      //トップレベルでexportされているコンポーネント以外は避ける警告
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      //使ってないimportを警告
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      //importをの順番を定義した通りに整列(lintをしたら自動修正)
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],

      //不要なフラグメントが書かれている場合に警告
      'react/jsx-no-useless-fragment': 'warn',

      //小要素を持ってないタグの警告
      'react/self-closing-comp': 'error',

      //コンポーネント名をパスカルケースにしてない場合に警告
      'react/jsx-pascal-case': 'warn',
    },
  },
)
