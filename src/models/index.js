const fs = require('fs')
const path = require('path')
const config = require('../config/')
const db = {}
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

const folders = fs.readdirSync(__dirname).filter(dir => dir !== 'index.js')

folders.forEach(folder => {
  fs
    .readdirSync(path.join(__dirname, `/${folder}`))
    .filter((file) =>
      file !== 'index.js' && !folders.includes(file)
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, `/${folder}`, file))
      db[model.name] = model
    })
})
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
