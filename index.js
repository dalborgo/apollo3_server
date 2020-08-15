const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = gql`
    directive @client on FIELD_DEFINITION
    type Query {
        hello: String
        product(id: ID!): Product
        products: [Product]
    }
    type Product {
        name: String
        price: Int
    }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    product: (_, { args }) => {
      return {
        name: 'jjj',
        price: 12,
      }
    },
    products: (_, { args }) => {
      return [{
        name: 'jjj',
        price: 12,
      },
        {
          name: 'j3jj',
          price: 132,
        }
      ]
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
