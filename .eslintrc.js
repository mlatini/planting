module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    // 'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    // 'react-hooks/rules-of-hooks': 'error', 
    // 'react-hooks/exhaustive-deps': 'warn',
    'max-len': ['error', 100],
    'no-warning-comments': 'warn',
    'no-console': 'warn',
    'semi': ["error", "always"],
    "comma-dangle": [
      "error", 
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
      }
    ],
    "react/jsx-filename-extension": [
      1, 
      { 
        "extensions": 
          [
            ".js", 
            ".jsx"
          ] 
      }
    ],
    "no-underscore-dangle": [
        "error", 
        { 
          "allow": ["_id"]
        }
    ]
  }
};
