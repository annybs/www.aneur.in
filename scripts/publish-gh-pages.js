const ghpages = require('gh-pages')
const process = require('process')

ghpages.publish('dist', {
  cname: 'www.aneur.in',
}, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
