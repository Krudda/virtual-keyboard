module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-multi-str': 'off',
    "indent": [2, "tab", { "SwitchCase": 1 }],
    "no-tabs": 0,
    "no-unused-expressions": ["error", { "allowTernary": true }],
    "no-param-reassign": ["error", { "props": false }],
    "max-len": ["error", { "code": 150 }]
  },
};
