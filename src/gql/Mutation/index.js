const pubsub = require('../PubSub')
module.exports = {
  createUser: async (parent, args, { models }) => {
    const user = await models.User.create(args)
    const users = await models.User.findAll()
    pubsub.publish('userAdded', {
      userAdded: users
    })
    return user
  }
}