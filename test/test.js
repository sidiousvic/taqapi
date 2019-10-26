const chai = require('chai');
const chaiGraphQL = require('chai-graphql');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
chai.should();
chai.use(chaiGraphQL);
chai.use(chaiHttp);
const server = 'http://localhost:4000';
const config = require('../config');
const knex = require('knex')(config.db);

describe('Queries', () => {
  describe('taqueria(name: String!)', () => {
    it('should get a taqueria', async () => {
      const query = `
        {
            taqueria(name: "La Cubanita") {
              name
              specialty
              rating
            }
          }`;

      // graphql request
      const response = await chai
        .request(server)
        .post('/graphql')
        .send({ query });

      expect(response.body.data.taqueria).to.not.equal(undefined);
      expect(response.body.data.taqueria.name).to.equal('La Cubanita');
    });
  });

  describe('taquerias', () => {
    it('should get all taquerias', async () => {
      const query = `
        {
            taquerias {
              name
              specialty
              rating
            }
          }`;

      // graphql request
      const response = await chai
        .request(server)
        .post('/graphql')
        .send({ query });

      // query all taquerias from psql
      const fromKnex = await knex
        .select('*')
        .from('taquerias')
        .then(taquerias => {
          return taquerias;
        });

      // remove id property to match query
      const withoutId = fromKnex.map(taqueria => {
        return {
          name: taqueria.name,
          specialty: taqueria.specialty,
          rating: taqueria.rating
        };
      });

      expect(response.body.data.taquerias).to.deep.equal(withoutId);
    });
  });
});
