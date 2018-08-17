const op = require('./sequelizeOperators')

module.exports = {
  port: process.env.PORT || 3001,
  SALT_FACTOR: 10,
  db: {
    database: process.env.DB_NAME || 'teste',
    user: 'root',
    password: 'root',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 3306,
      storage: './safe.mysql',
      logging: false,
      operatorsAliases: op
    }
  }
}
  