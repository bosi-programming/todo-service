module.exports = {
  extends: ['airbnb'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'function-paren-newline': 0,
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-cycle': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    camelcase: 0,
    indent: 0,
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'react/prop-types': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
