module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  env: {
    browser: true,
  },
};
