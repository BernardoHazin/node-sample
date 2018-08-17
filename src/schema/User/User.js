const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
}, {collection: 'User'})

module.exports = mongoose.model('User', UserSchema)
