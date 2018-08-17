const fs = require('fs')
const path = require('path')

const folders = fs.readdirSync(__dirname).filter(dir => dir !== 'index.js')

folders.forEach(folder => {
  fs
    .readdirSync(path.join(__dirname, `/${folder}`))
    .filter((file) =>
      file !== 'index.js' && !folders.includes(file)
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, `/${folder}`, file))
      db[file] = model
    })
})

module.exports = db
