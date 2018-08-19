const fs = require('fs')
const path = require('path')
const resolver = {}
let schema = ``

const schemas = fs.readdirSync(__dirname).filter(dir => dir !== 'index.js' && dir !== 'PubSub' && dir !== 'Mutation' && dir !== 'Query' && dir !== 'Subscription')
schemas.forEach(folder => {
  fs
    .readdirSync(path.join(__dirname, `/${folder}`))
    .filter((file) =>
      file !== 'test.js' &&file !== 'resolver.js' && !schemas.includes(file)
    )
    .forEach((file) => {
      const gqlSchema = require(path.join(__dirname, `/${folder}`, file))
      schema += gqlSchema
    })
})

const resolvers = fs.readdirSync(__dirname).filter(dir => dir !== 'index.js' && (dir === 'Mutation' || dir === 'Query' || dir === 'Subscription'))

resolvers.forEach(folder => {
  fs
    .readdirSync(path.join(__dirname, `/${folder}`))
    .filter(file => file === 'index.js')
    .forEach(() => {
      const gqlResolver = require(path.join(__dirname, `/${folder}`))
      if (gqlResolver) resolver[folder] = gqlResolver
    })
})

const queries = require('./Query/schema')
const mutations = require('./Mutation/schema')
const subscriptions = require('./Subscription/schema')

schema += queries
schema += mutations
schema += subscriptions

// console.log(schema)
// console.log(resolver)

module.exports.typeDefs = schema
module.exports.resolvers = resolver
