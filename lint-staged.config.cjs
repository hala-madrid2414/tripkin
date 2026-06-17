/** @type {import('lint-staged').Configuration} */
module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,less,html}': ['prettier --write'],
}
