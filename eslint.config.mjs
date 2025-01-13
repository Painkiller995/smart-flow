import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            // Define custom groups for import order
            ['builtin', 'external'],
            ['internal', 'sibling', 'parent', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'server-only', // Custom rule for server-only import
              group: 'builtin', // Treat server-only as a builtin
              position: 'before', // Ensure it comes first
            },
          ],
          'newlines-between': 'always',
        },
      ],
    },
  }),
];

export default eslintConfig;
