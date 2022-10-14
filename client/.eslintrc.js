module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'react/require-default-props': 0,
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
  },
  env: {
    browser: true,
  },
};
