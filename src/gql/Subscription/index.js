const pubsub = require('../PubSub')

module.exports = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator('userAdded')
  }
}