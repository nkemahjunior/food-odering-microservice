import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
//import "eslint-config-next"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // { next already configured this
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  //   plugins: {
  //     "react-hooks": reactHooks, 
  //   },
  //   rules: {
  //     "react-hooks/rules-of-hooks": "error",
  //     "react-hooks/exhaustive-deps": "warn",
  //   },
  // },
];

export default eslintConfig;
