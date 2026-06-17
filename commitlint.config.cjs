const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
  'wip',
  'workflow',
  'types',
  'release',
]

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'no-empty-scope-parentheses': ({ raw }) => {
          const hasEmptyScope = /^[a-z]+\(\):/.test(raw ?? '')

          return [
            !hasEmptyScope,
            'empty scope parentheses are not allowed; use "feat: xxx" or "feat(scope): xxx"',
          ]
        },
      },
    },
  ],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'scope-empty': [0],
    'type-enum': [2, 'always', allowedTypes],
    'no-empty-scope-parentheses': [2, 'always'],
  },
}
