// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
  // eslint.configs.recommended,
  // tseslint.configs.recommended,
  //reactHooks.configs.recommended,
  //react.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
    languageOptions: {
      // common parser options, enable TypeScript and JSX
      //parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },

    rules: {
      // ... any rules you want
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      // ...
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];


// eslint.config.mjs

// import eslint from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import globals from "globals";

// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,jsx,tsx}"],
//     // languageOptions: {
//     //   parser: "@typescript-eslint/parser",
//     //   parserOptions: {
//     //     sourceType: "module",
//     //     ecmaFeatures: {
//     //       jsx: true,
//     //     },
//     //   },
//     //   globals: {
//     //     ...globals.browser,
//     //   },
//     // },
//     plugins: {
//       react: react,
//       //reactHooks: reactHooks,
//       "@typescript-eslint": tseslint,
//     },
//     rules: {
//       // React-specific rules
//       "react/jsx-uses-react": "error",
//       "react/jsx-uses-vars": "error",
//       // React Hooks rules
//       // "react-hooks/rules-of-hooks": "error",
//       // "react-hooks/exhaustive-deps": "warn",
//       // TypeScript-specific rules
//       "@typescript-eslint/no-unused-vars": "warn",
//     },
//   },
// ];
