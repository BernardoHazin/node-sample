module.exports = {
  allUsers: async (parent, args, { models }) => {
    const users = await models.User.findAll()
    return users
  }
}