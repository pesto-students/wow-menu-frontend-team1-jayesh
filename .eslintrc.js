module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "global-require": 0,
    "default-param-last": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
