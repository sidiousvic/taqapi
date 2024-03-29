const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { _tacoParse, _update } = require('./utility');
const config = require('./config');
const knex = require('knex')(config.db);

const typeDefs = gql`
  type taquerias {
    name: String!
    specialty: String!
    rating: String!
  }
  type taqueria {
    name: String!
    specialty: String!
    rating: String!
  }
  input updateTaqueria {
    name: String!
    specialty: String!
    rating: Int!
  }
  type Query {
    taquerias: [taquerias]
    taqueria(name: String!): taqueria
    taqueriasByRating(rating: Int!): [taquerias]
  }
  type Mutation {
    updateRatingByName(name: String, rating: Int): String!
  }
`;

const resolvers = {
  Query: {
    taquerias: () => {
      return knex
        .select('*')
        .from('taquerias')
        .then(taquerias => {
          return taquerias;
        });
    },
    taqueria: (rt, rq) => {
      const taqueriaName = rq.name;
      return knex
        .select('*')
        .from('taquerias')
        .where({ name: taqueriaName })
        .then(taquerias => {
          const taqueria = taquerias.pop();
          return taqueria;
        });
    },
    taqueriasByRating: (rt, rq) => {
      const tacoRating = _tacoParse(rq.rating);
      return knex
        .select('*')
        .from('taquerias')
        .where({ rating: tacoRating })
        .then(taquerias => {
          return taquerias;
        });
    }
  },
  Mutation: {
    updateRatingByName: (rt, rq) => {
      const taqueriaName = rq.name;
      const newRating = _tacoParse(rq.rating);
      return knex('taquerias')
        .where({ name: taqueriaName })
        .update({ rating: newRating })
        .then(() => {
          return `Updated taqueria ${taqueriaName} in database! ${newRating}`;
        });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('.'));
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
