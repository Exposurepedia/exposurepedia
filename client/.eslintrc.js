module.exports = {
  extends: ['airbnb-typescript-prettier'],
  root: true,
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: ['arrow-function', 'function-declaration'],
      },
    ],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, variables: false },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-target-blank': [
      1,
      { allowReferrer: false, enforceDynamicLinks: 'always' },
    ],
    // turn off no-named-as-default-member for now since it's valid code
    'import/no-named-as-default-member': 0,
    // turn off no-named-as-default for now since it's valid code
    'import/no-named-as-default': 0,
    // no-relative-parent-imports as warning for now until we can clean them up
    'import/no-relative-parent-imports': 'off',
    // no-internal-modules as warning for now until we can clean them up
    'import/no-internal-modules': [
      'off',
      {
        allow: [
          '@material-ui/core/*',
          '@material-ui/lab/*',
          'uuid/*',
          'validator/lib/*',
        ],
      },
    ],
    // turn off no-cycle for now, we can leave this to webpack's CircularDependencyPlugin
    'import/no-cycle': 0,
    // turn off no-unresolved for now, we can leave this to TS
    'import/no-unresolved': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    browser: true,
  },
};
