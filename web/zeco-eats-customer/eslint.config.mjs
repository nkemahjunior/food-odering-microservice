// @ts-check

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import reactHooks from "eslint-plugin-react-hooks";
// import test from "eslint-config-next" 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // { next already configured this
  //   //files: ["**/*.{js,jsx,ts,tsx}"],
  //   plugins: {
  //     "react-hooks": reactHooks, // Use the imported plugin
  //   },
  //   rules: {
  //     "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
  //     "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  //   },
  // },
];

export default eslintConfig;




