const config = require('./config');
const knex = require('knex')(config.db);
const { _tacoParse, _update } = require('./utility');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
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
    updateRatingByName(name: String, rating: Int): taqueria
  }
`);

const root = {
  taquerias: () => {
    return knex
      .select('*')
      .from('taquerias')
      .then(taquerias => {
        console.log(taquerias);
        return taquerias;
      });
  },
  taqueria: rq => {
    const taqueriaName = rq.name;
    // console.log(rq.taqueriaName);
    return knex
      .select('*')
      .from('taquerias')
      .where({ name: taqueriaName })
      .then(taquerias => {
        const taqueria = taquerias.pop();
        return taqueria;
      });
  },
  taqueriasByRating: rq => {
    const tacoRating = _tacoParse(rq.rating);
    console.log(tacoRating);
    return knex
      .select('*')
      .from('taquerias')
      .where({ rating: tacoRating })
      .then(taquerias => {
        return taquerias;
      });
  },
  updateRatingByName: req => {
    const taqueriaName = req.name;
    const newRating = _tacoParse(req.rating);
    return knex
      .select('*')
      .from('taquerias')
      .where({ name: taqueriaName })
      .then(taquerias => {
        const taqueria = taquerias.pop();
        // console.log(taqueria);
        return {
          id: taqueria.id,
          name: taqueria.name,
          specialty: taqueria.specialty,
          rating: newRating
        };
      });
  }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
