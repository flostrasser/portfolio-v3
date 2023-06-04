module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-param-reassign': ['error', { props: false }], // not needed, only for reference
  },
  ignorePatterns: ['.eslintrc.js'], // ignore this file
};
