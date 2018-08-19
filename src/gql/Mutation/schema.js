module.exports = `
  type Mutation {
    createUser(username: String!, password: String!): User!
  }
`