module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    __: true,
    axios: true,
    __I18N_LANG__: true
  },
  rules: {
    'max-len': [1, 120],
    'no-console': 0,
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 1,
    'import/no-unresolved': 0,
    'newline-per-chained-call': 0,
    'jsx-quotes': [1, 'prefer-single'],
    'one-var': 0,
    'comma-dangle': 1,
    'spaced-comment': 1,
    'no-underscore-dangle': 1,
    'no-param-reassign': 1,
    'no-sequences': 0,
    'no-use-before-define': 1,
    'no-unused-expressions': 0,
    'no-useless-constructor': 1,
    'one-var-declaration-per-line': 0
  }
};
