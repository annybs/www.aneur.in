const ghpages = require('gh-pages')

ghpages.publish('dist', {
  cname: 'www.aneur.in',
}, err => {
  err && console.error(err)
})
