const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const {SALT_FACTOR} = require('../../config') 
module.exports.hashPassword = (user, options) => {
  if (!user.changed('password')) {
    return
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password)
}