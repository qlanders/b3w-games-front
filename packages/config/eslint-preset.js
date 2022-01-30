module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "prettier"
  ],
  "plugins": [
    "jest",
    "babel",
    "@typescript-eslint"
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
