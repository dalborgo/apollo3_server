const { log } = require('./log')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    hello: String
    product(id: ID!): Product
    products: [Product]
    favoriteBook: Book
  }
  type Mutation {
    changeBook(input: EditBookInput!): Book
  }
  type Product {
    name: String
    price: Int
  }
  type Book {
    isbn: ID!
    title: String
    author: Author
  }
  type Author {
    language: String
    name: String
  }
  input EditBookInput {
    title: String
    author: AuthorInput
  }
  input AuthorInput {
    language: String
    name: String
  }
`

const book_1 = {
  isbn: 'long_id',
  title: 'Il Giovane Holden',
  author: {
    language: 'en',
    name: 'David Jerome Sallinger',
  },
}

const resolvers = {
  Mutation: {
    changeBook: (_, { input }) => {
      return Object.assign(book_1, input)
    },
  },
  Query: {
    hello: () => 'Hello world!',
    product: (_, { args }) => {
      return {
        name: 'jjj',
        price: 12,
      }
    },
    favoriteBook: (_, { args }) => {
      return book_1
    },
    products: (_, { args }) => {
      return [
        {
          name: 'jjj',
          price: 12,
        },
        {
          name: 'j3jj',
          price: 132,
        },
      ]
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

log.setLevel(log.levels.TRACE) // Be sure to call setLevel method in order to apply plugin
log.table = console.table // eslint-disable-line no-console
log.dir = console.dir // eslint-disable-line no-console
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
