// // @ts-check

// import eslint from "@eslint/js";
// import tseslint from "typescript-eslint";
// import react from "eslint-plugin-react";
// import globals from "globals";

// export default tseslint.config(
//   eslint.configs.recommended,
//   tseslint.configs.recommended,
//   {
//     files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
//     plugins: {
//       react,
//     },
//     languageOptions: {
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: {
//         ...globals.browser,
//       },
//     },
//     rules: {
//       // ... any rules you want
//       "react/jsx-uses-react": "error",
//       "react/jsx-uses-vars": "error",
//     },
//     // ... others are omitted for brevity
//   },
//   {
//     extends: [
//       // ...
//       "plugin:react-hooks/recommended",
//     ],
//     plugins: ["react-hooks"],
//     rules: {
//       // ...
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "warn",
//     },
//   },
// );

// @ts-check

import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": ts,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs["eslint-recommended"].overrides[0].rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Additional custom rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
