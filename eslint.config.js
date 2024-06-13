const annybs = require('@annybs/eslint')

module.exports = [
  ...annybs,
  {
    ignores: ["scripts/**.js"]
  }
]
