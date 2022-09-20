module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: [
    "webpack/*",
    "eslintrc.js",
    "jest.config.js"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-max-props-per-line": [2, { "when": "always" }],
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-tag-spacing": [2, { beforeSelfClosing: "always" }],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "no-restricted-imports": ["error", {
      "patterns": [
        "@mui/*/*/*",
        "@mui/material",
        "!@mui/material/test-utils/*"],
    }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "react/prop-types": ["error", {
      ignore: ["children"]
    }],
  },
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "import",
    "react",
    "@typescript-eslint",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "ecmaFeatures": {
        "jsx": true
      }
    },
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "17.8.2",
    },
    "import/resolver": "webpack",
  },
};
