// eslint.config.js
import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // для React 17+
    },
  },
];
