const path = require("path");

/**
 * @see https://eslint.org/docs/user-guide/configuring#using-eslintrecommended
 */
module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "react-hooks"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "tsconfigRootDir": "./",
    "project": path.resolve(__dirname, "tsconfig.json"), // https://github.com/microsoft/vscode-eslint/issues/691
  },
  "rules": {
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "react/display-name": ["off"], // TODO https://github.o-in.dwango.co.jp/NicoliveComponent/svg-to-react が対応したらonにする
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "max-len": ["warn", { "ignoreComments": true, "code": 140, "ignoreStrings": true }],
    "semi": ["error", "always"],
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "16.8.6"
    }
  }
};
