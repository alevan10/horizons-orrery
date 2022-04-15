module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      extends: [
        'airbnb-typescript',
        'prettier',
        'plugin:import/recommended'
      ],
      rules: {
        "react/jsx-filename-extension": "off",
      },

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
};