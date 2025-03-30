import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["./node_modules/*", "./dist/*"],
    rules: {
      //"no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "no-explicit-any": "off",
    },
  },
]);
