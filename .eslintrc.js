module.exports = {
  "env": {
    "node": true,
    "es2020": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
    "jsx": true
    }
  },
};
