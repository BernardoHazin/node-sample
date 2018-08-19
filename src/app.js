const { createServer } = require('http')
const app =  require('express')()
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/')
const models = require('./models')
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

/* 
const mongoose = require('mongoose')
mongoose.connect('Endereço mongodb')

const db = mongoose.connection
db.on('error', () => console.log('Failed to connect to DB.'))
.once('open', () => console.log('Connected to DB. '))
*/
const {typeDefs, resolvers} = require('./gql')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(bodyParser.json())
app.use(cors())

const server = createServer(app)

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use('/graphql', graphqlExpress({ schema, context: { models } }))

fs
  .readdirSync(path.join(__dirname, '/routes'))
  .forEach((file) => {
    app.use(`/${file.slice(0, -3)}`, require(`./routes/${file.slice(0, -3)}`))
  })


models.sequelize.sync({force: true})
  .then(() => {
    server.listen(config.port, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
        },
        {
          server,
          path: '/subscriptions',
        }
      )
      console.log('Server started at', config.port)
    })
  })