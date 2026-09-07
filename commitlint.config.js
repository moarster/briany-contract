module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'chore', 'ci']],
    'scope-case': [2, 'always', 'pascal-case'],
  },
};
