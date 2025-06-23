module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended"
    // Quitamos "google" para evitar reglas de estilo estrictas
  ],
  rules: {
    quotes: "off", // No marcar errores por comillas
    "prefer-arrow-callback": "off",
    "no-restricted-globals": "off",
    semi: "off",
    "no-unused-vars": "off",
    "no-console": "off"
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
