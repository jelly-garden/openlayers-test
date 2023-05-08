module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  root: true,
  plugins: ["react-refresh", "prettier", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "object-curly-spacing": ["error", "always"],
    "no-console": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        groups: ["builtin", "external", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "react/jsx-key": [
      "off",
      {
        checkFragmentShorthand: true,
      },
    ],
    "react/prop-types": "off",
    "react/jsx-tag-spacing": [
      "error",
      {
        beforeSelfClosing: "always",
      },
    ],
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react-refresh/only-export-components": "warn",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
