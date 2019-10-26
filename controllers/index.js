const { _tacoParse, _update } = require('../utility');
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
    updateRatingByName(name: String, rating: Int): String!
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
    return knex
      .select('*')
      .from('taquerias')
      .where({ rating: tacoRating })
      .then(taquerias => {
        return taquerias;
      });
  },
  updateRatingByName: rq => {
    console.log(rq);
    const taqueriaName = rq.name;
    const newRating = _tacoParse(rq.rating);
    return knex('taquerias')
      .where({ name: taqueriaName })
      .update({ rating: newRating })
      .then(taqueria => {
        return `Taqueria ${taqueriaName} in database! ${newRating}`;
      });
  }
};

module.exports = { schema, root };
