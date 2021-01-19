module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 1,
    'no-unused-vars': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types':0,
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    semi: 1,
    'prefer-const': 0,
    quotes: [1, 'single'],
    indent: 0,
    'object-shorthand': 1,
    // 'no-irregular-whitespace':0,
    camelcase: 1,
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        'key-spacing': false
      }
    ]
  },
};
