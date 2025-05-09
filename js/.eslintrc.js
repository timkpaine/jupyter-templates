/******************************************************************************
 *
 * Copyright (c) 2024, the jupyter_templates authors.
 *
 * This file is part of the jupyter_templates library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["airbnb-base", "prettier", "plugin:json/recommended"],
  plugins: ["prettier", "jest"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jasmine: true,
    jest: true,
    "jest/globals": true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {},
    sourceType: "module",
    experimentalObjectRestSpread: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 200,
        tabWidth: 2,
        bracketSpacing: false,
      },
    ],
    "max-len": [
      "warn",
      {
        code: 200,
        comments: 200,
        ignoreTrailingComments: true,
      },
    ],
    camelcase: "off",
    "class-methods-use-this": "off",
    "constructor-super": "error",
    indent: "off",
    "linebreak-style": ["error", "unix"],
    "no-const-assign": "error",
    "no-nested-ternary": "warn",
    "no-this-before-super": "error",
    "no-undef": "error",
    "no-underscore-dangle": "off",
    "no-unreachable": "error",
    "no-unused-vars": "warn",
    "object-curly-spacing": "off",
    quotes: "off",
    "spaced-comment": "off",
    "valid-typeof": "error",

    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
