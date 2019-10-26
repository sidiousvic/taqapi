const config = require('./config');
const knex = require('knex')(config.db);

knex
  .select('*')
  .from('taquerias')
  .then(taquerias => {
    console.log(taquerias);
  });
